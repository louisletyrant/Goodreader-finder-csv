import Papa from 'papaparse';
import { GoodreadsBook } from './types';


export function parseGoodreadsCsv(csvText: string): GoodreadsBook[] {
  const result = Papa.parse<Record<string, string>>(csvText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim(),
  });

  if (result.errors.length > 0) {
    const fatal = result.errors.filter((e) => e.type !== 'FieldMismatch');
    if (fatal.length > 0) {
      throw new Error(`CSV illisible : ${fatal[0].message}`);
    }
  }

  const fields = result.meta.fields ?? [];
  if (!fields.includes('Book Id') || !fields.includes('Title')) {
    throw new Error(
      "Ce fichier ne ressemble pas à un export Goodreads. " +
        'Utilisez My Books → Tools → Import and export → Export Library.',
    );
  }

  return result.data
    .filter((row) => row['Book Id'] && row['Title'])
    .map(rowToBook);
}

function rowToBook(row: Record<string, string>): GoodreadsBook {
  const id = clean(row['Book Id']);
  return {
    id,
    title: clean(row['Title']),
    author: clean(row['Author']),
    additionalAuthors: splitList(row['Additional Authors']),
    isbn10: cleanIsbn(row['ISBN']),
    isbn13: cleanIsbn(row['ISBN13']),
    myRating: ratingOrNull(row['My Rating']),
    averageRating: floatOrNull(row['Average Rating']),
    publisher: clean(row['Publisher']),
    binding: clean(row['Binding']),
    numPages: intOrNull(row['Number of Pages']),
    yearPublished: intOrNull(row['Year Published']),
    originalYear: intOrNull(row['Original Publication Year']),
    dateRead: toIsoDate(row['Date Read']),
    dateAdded: toIsoDate(row['Date Added']),
    shelves: splitList(row['Bookshelves']),
    exclusiveShelf: clean(row['Exclusive Shelf']),
    myReview: textOrNull(row['My Review']),
    privateNotes: textOrNull(row['Private Notes']),
    readCount: intOrNull(row['Read Count']) ?? 0,
    ownedCopies: intOrNull(row['Owned Copies']) ?? 0,
    goodreadsUrl: `https://www.goodreads.com/book/show/${id}`,
  };
}

// ---------------------------------------------------------------------------

function clean(value: string | undefined): string {
  return (value ?? '').trim();
}

/** ="9782070328383" → 9782070328383 ; ="" → '' */
function cleanIsbn(value: string | undefined): string {
  return clean(value).replace(/[="]/g, '');
}

function splitList(value: string | undefined): string[] {
  return clean(value)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Goodreads exporte 0 pour « non noté ». */
function ratingOrNull(value: string | undefined): number | null {
  const n = parseInt(clean(value), 10);
  return Number.isFinite(n) && n >= 1 && n <= 5 ? n : null;
}

function intOrNull(value: string | undefined): number | null {
  const n = parseInt(clean(value), 10);
  return Number.isFinite(n) ? n : null;
}

function floatOrNull(value: string | undefined): number | null {
  const n = parseFloat(clean(value));
  return Number.isFinite(n) ? n : null;
}

/**
 * "2026/06/13" → "2026-06-13".
 * On évite new Date(...) : selon le fuseau, la date pouvait reculer d'un jour.
 */
function toIsoDate(value: string | undefined): string | null {
  const v = clean(value);
  const match = v.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);
  if (!match) return v || null;
  return `${match[1]}-${match[2].padStart(2, '0')}-${match[3].padStart(2, '0')}`;
}

function textOrNull(value: string | undefined): string | null {
  const v = clean(value);
  return v ? v : null;
}
