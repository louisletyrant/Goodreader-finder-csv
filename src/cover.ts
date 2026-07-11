import { App, TFile, normalizePath, requestUrl } from 'obsidian';

/**
 * Le CSV Goodreads ne contient AUCUNE image de couverture.
 * Enrichissement optionnel : Open Library sert les couvertures par ISBN,
 * librement et sans clé d'API :
 *   https://covers.openlibrary.org/b/isbn/{isbn}-L.jpg
 * `default=false` renvoie 404 au lieu d'un GIF placeholder d'1 pixel.
 */
export async function downloadCoverByIsbn(
  app: App,
  isbn: string,
  bookId: string,
  coverFolder: string,
): Promise<string | undefined> {
  if (!isbn) return undefined;
  try {
    const folder = normalizePath(coverFolder);
    await ensureFolder(app, folder);

    const path = normalizePath(`${folder}/${bookId}.jpg`);
    const existing = app.vault.getAbstractFileByPath(path);
    if (existing instanceof TFile) return path; // déjà téléchargée

    const url = `https://covers.openlibrary.org/b/isbn/${encodeURIComponent(isbn)}-L.jpg?default=false`;
    const response = await requestUrl({ url, method: 'GET', throw: false });
    // 404 = pas de couverture connue pour cet ISBN ; on ignore aussi les
    // réponses minuscules (placeholder).
    if (response.status !== 200 || !response.arrayBuffer || response.arrayBuffer.byteLength < 2000) {
      return undefined;
    }

    await app.vault.createBinary(path, response.arrayBuffer);
    return path;
  } catch (e) {
    console.warn(`[Goodreads CSV Importer] Couverture indisponible (ISBN ${isbn})`, e);
    return undefined;
  }
}

/** createFolder lève une erreur si le dossier existe → vérifier d'abord (récursif). */
export async function ensureFolder(app: App, path: string): Promise<void> {
  const normalized = normalizePath(path);
  if (app.vault.getAbstractFileByPath(normalized)) return;
  const parts = normalized.split('/');
  let current = '';
  for (const part of parts) {
    current = current ? `${current}/${part}` : part;
    if (!app.vault.getAbstractFileByPath(current)) {
      try {
        await app.vault.createFolder(current);
      } catch (e) {
        if (!app.vault.getAbstractFileByPath(current)) throw e;
      }
    }
  }
}

