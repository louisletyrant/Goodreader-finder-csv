import { GoodreadsBook } from './types';

export const DEFAULT_TEMPLATE = `---
title: "{{title}}"
author: "{{author}}"
additional_authors: [{{additionalAuthorsQuoted}}]
isbn13: "{{isbn13}}"
publisher: "{{publisher}}"
binding: "{{binding}}"
pages: {{numPages}}
year_published: {{yearPublished}}
original_year: {{originalYear}}
my_rating: {{myRating}}
average_rating: {{averageRating}}
shelf: "{{exclusiveShelf}}"
shelves: [{{shelvesQuoted}}]
date_read: {{dateRead}}
date_added: {{dateAdded}}
read_count: {{readCount}}
goodreads_url: {{goodreadsUrl}}
tags: [book, goodreads]
---

# {{title}}

{{coverEmbed}}

**Auteur :** {{authors}}
**Ma note :** {{myRatingStars}}
**Note moyenne Goodreads :** {{averageRating}}/5
**Statut :** {{exclusiveShelf}}
**Lu le :** {{dateRead}}

{{reviewSection}}
{{notesSection}}

---
[Voir sur Goodreads]({{goodreadsUrl}})
`;

/**
 * Rendu du template. Corrige le bug de la version initiale :
 * String.replace("{{x}}", …) ne remplace que la PREMIÈRE occurrence —
 * ici on remplace toutes les occurrences via une seule regex globale,
 * ce qui évite aussi qu'une valeur contenant "{{...}}" soit ré-interprétée.
 */
export function renderTemplate(template: string, book: GoodreadsBook): string {
  const vars = buildVariables(book);
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_m, key: string) => vars[key] ?? '');
}

function buildVariables(book: GoodreadsBook): Record<string, string> {
  const allAuthors = [book.author, ...book.additionalAuthors].filter(Boolean);

  const coverEmbed = book.coverLocalPath ? `![[${book.coverLocalPath}|250]]` : '';

  const stars =
    book.myRating != null
      ? '★'.repeat(book.myRating) + '☆'.repeat(5 - book.myRating) + ` (${book.myRating}/5)`
      : 'Non noté';

  const reviewSection = book.myReview ? `## Ma critique\n\n${book.myReview}` : '';
  const notesSection = book.privateNotes ? `## Notes privées\n\n${book.privateNotes}` : '';

  return {
    id: book.id,
    title: yamlEscape(book.title),
    author: yamlEscape(book.author),
    authors: allAuthors.join(', '),
    additionalAuthors: book.additionalAuthors.join(', '),
    additionalAuthorsQuoted: book.additionalAuthors.map((a) => `"${yamlEscape(a)}"`).join(', '),
    isbn10: book.isbn10,
    isbn13: book.isbn13,
    myRating: book.myRating != null ? String(book.myRating) : '',
    myRatingStars: stars,
    averageRating: book.averageRating != null ? String(book.averageRating) : '',
    publisher: yamlEscape(book.publisher),
    binding: book.binding,
    numPages: book.numPages != null ? String(book.numPages) : '',
    yearPublished: book.yearPublished != null ? String(book.yearPublished) : '',
    originalYear: book.originalYear != null ? String(book.originalYear) : '',
    dateRead: book.dateRead ?? '',
    dateAdded: book.dateAdded ?? '',
    shelves: book.shelves.join(', '),
    shelvesQuoted: book.shelves.map((s) => `"${yamlEscape(s)}"`).join(', '),
    exclusiveShelf: book.exclusiveShelf,
    myReview: book.myReview ?? '',
    privateNotes: book.privateNotes ?? '',
    readCount: String(book.readCount),
    ownedCopies: String(book.ownedCopies),
    goodreadsUrl: book.goodreadsUrl,
    coverLocal: book.coverLocalPath ?? '',
    coverEmbed,
    reviewSection,
    notesSection,
    today: new Date().toISOString().slice(0, 10),
  };
}

function yamlEscape(value: string): string {
  return value.replace(/"/g, '\\"');
}

/**
 * Nom de fichier valide pour Obsidian.
 * Corrige la version initiale qui détruisait les accents
 * ("Le Paradis perdu" → "Le_Paradis_perdu") : on ne retire QUE les
 * caractères réellement interdits.
 */
export function sanitizeFilename(name: string): string {
  return name
    .replace(/[\\/:*?"<>|#^[\]]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 120);
}
