import { App, TFile, normalizePath } from 'obsidian';
import { GoodreadsBook, ImportSettings } from './types';
import { renderTemplate, sanitizeFilename, DEFAULT_TEMPLATE } from './template';

export type NoteResult = 'created' | 'updated' | 'skipped';

/**
 * Crée (ou met à jour) la note d'un livre.
 * Corrections par rapport à la version initiale :
 * - vault.create ÉCHOUE si le fichier existe → gestion skip/overwrite ;
 * - le remplacement de variables est global (voir template.ts) ;
 * - les accents sont conservés dans le nom de fichier.
 */
export async function createNote(
  app: App,
  book: GoodreadsBook,
  settings: ImportSettings,
  template: string,
): Promise<NoteResult> {
  const baseName = sanitizeFilename(
    book.author ? `${book.title} - ${book.author}` : book.title,
  );
  const path = normalizePath(`${settings.vaultDir}/${baseName}.md`);

  const existing = app.vault.getAbstractFileByPath(path);
  if (existing instanceof TFile && !settings.overwriteExisting) {
    return 'skipped';
  }

  const content = renderTemplate(template, book);

  if (existing instanceof TFile) {
    await app.vault.modify(existing, content);
    return 'updated';
  }
  await app.vault.create(path, content);
  return 'created';
}

/** Charge le template du vault, sinon le template intégré. */
export async function loadTemplate(app: App, settings: ImportSettings): Promise<string> {
  const templatePath = settings.templatePath?.trim();
  if (templatePath) {
    const file = app.vault.getAbstractFileByPath(normalizePath(templatePath));
    if (file instanceof TFile) {
      try {
        return await app.vault.read(file);
      } catch (e) {
        console.warn('[Goodreads CSV Importer] Template illisible → template intégré.', e);
      }
    }
  }
  return DEFAULT_TEMPLATE;
}
