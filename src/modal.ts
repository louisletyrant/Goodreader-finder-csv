import { App, ButtonComponent, Modal, Notice, Setting } from 'obsidian';
import { parseGoodreadsCsv } from './parser';
import { createNote, loadTemplate } from './noteGenerator';
import { downloadCoverByIsbn, ensureFolder } from './covers';
import { GoodreadsBook, ImportSettings, ImportReport } from './types';

export class ImportModal extends Modal {
  private books: GoodreadsBook[] = [];
  private fileName = '';
  private cancelled = false;

  private progressBar: HTMLElement | null = null;
  private progressLabel: HTMLElement | null = null;

  constructor(
    app: App,
    private settings: ImportSettings,
  ) {
    super(app);
  }

  onOpen(): void {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass('goodreads-csv-modal');
    contentEl.createEl('h2', { text: 'Importer un export CSV Goodreads' });
    contentEl.createEl('p', {
      cls: 'goodreads-csv-hint',
      text: 'Sur Goodreads : My Books → Tools → Import and export → Export Library.',
    });

    // --- Sélection du fichier ------------------------------------------
    const fileSetting = new Setting(contentEl).setName('Fichier CSV');
    const fileInput = fileSetting.controlEl.createEl('input', {
      type: 'file',
      attr: { accept: '.csv,text/csv' },
    });

    const previewEl = contentEl.createDiv({ cls: 'goodreads-csv-preview' });
    const statusEl = contentEl.createDiv({ cls: 'goodreads-csv-status' });

    fileInput.addEventListener('change', async () => {
      const file = fileInput.files?.[0];
      this.books = [];
      previewEl.empty();
      statusEl.setText('');
      if (!file) return;
      try {
        // Notice : lire le fichier en texte AVANT de parser
        // (Papa.parse(File) est asynchrone et intestable ; le texte est simple).
        const text = await file.text();
        this.books = parseGoodreadsCsv(text);
        this.fileName = file.name;
        this.renderPreview(previewEl);
      } catch (e) {
        statusEl.setText(e instanceof Error ? e.message : String(e));
      }
    });

    // --- Filtre d'étagère ------------------------------------------------
    new Setting(contentEl)
      .setName('Filtrer par étagère')
      .setDesc('Vide = tout importer. Sinon : read, to-read, currently-reading…')
      .addText((text) => {
        text.setPlaceholder('(toutes)');
        text.setValue(this.settings.shelfFilter);
        text.onChange((value) => (this.settings.shelfFilter = value.trim()));
      });

    new Setting(contentEl)
      .setName('Couvertures via Open Library')
      .setDesc("Le CSV ne contient pas d'images : récupération par ISBN (~1 requête/livre).")
      .addToggle((toggle) => {
        toggle.setValue(this.settings.downloadCovers);
        toggle.onChange((value) => (this.settings.downloadCovers = value));
      });

    // --- Progression ------------------------------------------------------
    const progressWrapper = contentEl.createDiv({ cls: 'goodreads-csv-progress is-hidden' });
    this.progressLabel = progressWrapper.createDiv({ cls: 'goodreads-csv-progress-label' });
    const track = progressWrapper.createDiv({ cls: 'goodreads-csv-progress-track' });
    this.progressBar = track.createDiv({ cls: 'goodreads-csv-progress-bar' });

    // --- Boutons -----------------------------------------------------------
    let importButton: ButtonComponent;
    let cancelButton: ButtonComponent;
    new Setting(contentEl)
      .addButton((btn) => {
        importButton = btn;
        btn
          .setButtonText('Importer')
          .setCta()
          .onClick(async () => {
            if (this.books.length === 0) {
              statusEl.setText('Sélectionnez d’abord un fichier CSV valide.');
              return;
            }
            importButton.setDisabled(true);
            cancelButton.setDisabled(false);
            progressWrapper.removeClass('is-hidden');
            this.cancelled = false;
            try {
              const report = await this.runImport(statusEl);
              const summary =
                `Import terminé : ${report.created} créée(s), ${report.updated} mise(s) à jour, ` +
                `${report.skipped} ignorée(s), ${report.failed} échec(s).`;
              new Notice(summary, 8000);
              statusEl.setText(summary + (report.errors.length ? `\n${report.errors.join('\n')}` : ''));
            } catch (e) {
              const msg = e instanceof Error ? e.message : String(e);
              statusEl.setText(msg);
              new Notice(`Goodreads CSV Importer : ${msg}`, 8000);
            } finally {
              importButton.setDisabled(false);
              cancelButton.setDisabled(true);
            }
          });
      })
      .addButton((btn) => {
        cancelButton = btn;
        btn.setButtonText('Annuler').setDisabled(true).onClick(() => (this.cancelled = true));
      });
  }

  onClose(): void {
    this.cancelled = true;
    this.contentEl.empty();
  }

  // -------------------------------------------------------------------------

  private renderPreview(previewEl: HTMLElement): void {
    previewEl.empty();
    const byShelf = new Map<string, number>();
    for (const book of this.books) {
      const shelf = book.exclusiveShelf || '(sans étagère)';
      byShelf.set(shelf, (byShelf.get(shelf) ?? 0) + 1);
    }
    const parts = Array.from(byShelf.entries())
      .map(([shelf, count]) => `${shelf} : ${count}`)
      .join(' · ');
    previewEl.createEl('p', {
      text: `${this.fileName} — ${this.books.length} livre(s) (${parts})`,
    });
    // Aperçu des 5 premiers titres
    const list = previewEl.createEl('ul');
    for (const book of this.books.slice(0, 5)) {
      list.createEl('li', { text: `${book.title} — ${book.author}` });
    }
    if (this.books.length > 5) {
      previewEl.createEl('p', { cls: 'goodreads-csv-hint', text: `… et ${this.books.length - 5} autres.` });
    }
  }

  private async runImport(statusEl: HTMLElement): Promise<ImportReport> {
    const report: ImportReport = { created: 0, updated: 0, skipped: 0, failed: 0, errors: [] };

    const filter = this.settings.shelfFilter.trim().toLowerCase();
    const books = filter
      ? this.books.filter(
          (b) =>
            b.exclusiveShelf.toLowerCase() === filter ||
            b.shelves.some((s) => s.toLowerCase() === filter),
        )
      : this.books;

    if (books.length === 0) {
      throw new Error(`Aucun livre sur l'étagère « ${this.settings.shelfFilter} ».`);
    }

    const template = await loadTemplate(this.app, this.settings);
    await ensureFolder(this.app, this.settings.vaultDir);

    for (let i = 0; i < books.length; i++) {
      if (this.cancelled) throw new Error('Import annulé.');
      const book = books[i];
      this.setProgress((i + 1) / books.length, `${i + 1}/${books.length} — ${book.title}`);

      try {
        if (this.settings.downloadCovers) {
          const isbn = book.isbn13 || book.isbn10;
          book.coverLocalPath = await downloadCoverByIsbn(
            this.app,
            isbn,
            book.id,
            this.settings.coverFolder,
          );
        }
        const result = await createNote(this.app, book, this.settings, template);
        report[result === 'created' ? 'created' : result === 'updated' ? 'updated' : 'skipped']++;
      } catch (e) {
        report.failed++;
        const msg = e instanceof Error ? e.message : String(e);
        report.errors.push(`${book.title} : ${msg}`);
        console.error(`[Goodreads CSV Importer] Échec pour "${book.title}"`, e);
      }
    }
    return report;
  }

  private setProgress(ratio: number, label: string): void {
    if (this.progressBar) {
      this.progressBar.style.width = `${Math.round(Math.min(1, Math.max(0, ratio)) * 100)}%`;
    }
    this.progressLabel?.setText(label);
  }
}
