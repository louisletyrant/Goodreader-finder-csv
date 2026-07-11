export interface GoodreadsBook {
  id: string;                    // "Book Id"
  title: string;                 // "Title"
  author: string;                // "Author" (déjà dans l'ordre Prénom Nom)
  additionalAuthors: string[];   // "Additional Authors"
  isbn10: string;                // "ISBN"   (nettoyé du format ="...")
  isbn13: string;                // "ISBN13" (nettoyé du format ="...")
  myRating: number | null;       // "My Rating" — 0 = non noté → null
  averageRating: number | null;  // "Average Rating"
  publisher: string;             // "Publisher"
  binding: string;               // "Binding" (format : poche, relié…)
  numPages: number | null;       // "Number of Pages"
  yearPublished: number | null;  // "Year Published" (édition)
  originalYear: number | null;   // "Original Publication Year"
  dateRead: string | null;       // "Date Read"  → ISO yyyy-mm-dd
  dateAdded: string | null;      // "Date Added" → ISO yyyy-mm-dd
  shelves: string[];             // "Bookshelves" (étagères personnalisées)
  exclusiveShelf: string;        // "Exclusive Shelf" (read / to-read / currently-reading)
  myReview: string | null;       // "My Review"
  privateNotes: string | null;   // "Private Notes"
  readCount: number;             // "Read Count"
  ownedCopies: number;           // "Owned Copies"
  goodreadsUrl: string;          // reconstruite depuis Book Id
  // Enrichissement optionnel (Open Library)
  coverLocalPath?: string;
}

export interface ImportSettings {
  vaultDir: string;          // Dossier de destination des notes
  templatePath: string;      // Note-template du vault ('' = template intégré)
  overwriteExisting: boolean;
  downloadCovers: boolean;   // Récupérer les couvertures via Open Library (ISBN)
  coverFolder: string;
  shelfFilter: string;       // '' = tout, sinon nom d'une Exclusive Shelf
}

export const DEFAULT_SETTINGS: ImportSettings = {
  vaultDir: 'Books',
  templatePath: '',
  overwriteExisting: false,
  downloadCovers: true,
  coverFolder: 'Books/covers',
  shelfFilter: '',
};

export interface ImportReport {
  created: number;
  updated: number;
  skipped: number;
  failed: number;
  errors: string[];
}
