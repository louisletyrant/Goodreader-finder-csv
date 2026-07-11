import { App, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { ImportModal } from './modal';
import { DEFAULT_SETTINGS, ImportSettings } from './types';

export default class GoodreadsCsvImporterPlugin extends Plugin {
  settings!: ImportSettings;

  async onload(): Promise<void> {
    await this.loadSettings();

    this.addRibbonIcon('book-open', 'Importer un CSV Goodreads', () => {
      new ImportModal(this.app, this.settings).open();
    });

    this.addCommand({
      id: 'import-goodreads-csv',
      name: 'Import Goodreads CSV export',
      callback: () => new ImportModal(this.app, this.settings).open(),
    });

    this.addSettingTab(new GoodreadsCsvSettingTab(this.app, this));
  }

  async loadSettings(): Promise<void> {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, (await this.loadData()) ?? {});
  }

  async saveSettings(): Promise<void> {
    await this.saveData(this.settings);
  }
}

class GoodreadsCsvSettingTab extends PluginSettingTab {
  constructor(
    app: App,
    private plugin: GoodreadsCsvImporterPlugin,
  ) {
    super(app, plugin);
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    new Setting(containerEl)
      .setName('Dossier des notes')
      .setDesc('Dossier du vault où créer les notes de livres.')
      .addText((text) => {
        text.setPlaceholder('Books');
        text.setValue(this.plugin.settings.vaultDir);
        text.onChange(async (value) => {
          this.plugin.settings.vaultDir = value.trim() || 'Books';
          await this.plugin.saveSettings();
        });
      });

    new Setting(containerEl)
      .setName('Template personnalisé')
      .setDesc(
        'Chemin vers une note-template (vide = template intégré). ' +
          'Variables : {{title}}, {{author}}, {{authors}}, {{myRating}}, {{myRatingStars}}, ' +
          '{{dateRead}}, {{shelves}}, {{coverEmbed}}, {{reviewSection}}, {{goodreadsUrl}}…',
      )
      .addText((text) => {
        text.setPlaceholder('Templates/Goodreads Book.md');
        text.setValue(this.plugin.settings.templatePath);
        text.onChange(async (value) => {
          this.plugin.settings.templatePath = value.trim();
          await this.plugin.saveSettings();
        });
      });

    new Setting(containerEl)
      .setName('Écraser les notes existantes')
      .setDesc('Si désactivé, les livres déjà importés sont ignorés (ré-import sûr).')
      .addToggle((toggle) => {
        toggle.setValue(this.plugin.settings.overwriteExisting);
        toggle.onChange(async (value) => {
          this.plugin.settings.overwriteExisting = value;
          await this.plugin.saveSettings();
        });
      });

    new Setting(containerEl)
      .setName('Télécharger les couvertures (Open Library)')
      .setDesc("L'export CSV ne contient pas d'images : elles sont récupérées par ISBN.")
      .addToggle((toggle) => {
        toggle.setValue(this.plugin.settings.downloadCovers);
        toggle.onChange(async (value) => {
          this.plugin.settings.downloadCovers = value;
          await this.plugin.saveSettings();
        });
      });

    new Setting(containerEl)
      .setName('Dossier des couvertures')
      .addText((text) => {
        text.setPlaceholder('Books/covers');
        text.setValue(this.plugin.settings.coverFolder);
        text.onChange(async (value) => {
          this.plugin.settings.coverFolder = value.trim() || 'Books/covers';
          await this.plugin.saveSettings();
        });
      });
  }
}

