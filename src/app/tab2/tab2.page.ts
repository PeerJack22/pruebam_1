import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OpenLibrarySearchField, OpenLibrarySearchResult, OpenLibraryService } from '../services/open-library.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  query = '';
  searchField: OpenLibrarySearchField = 'title';
  isLoading = false;
  errorMessage = '';
  results: OpenLibrarySearchResult[] = [];

  searchFields = [
    { value: 'title', label: 'Por título del libro' },
    { value: 'author', label: 'Por autor' },
    { value: 'subject', label: 'Por género o categoría' },
    { value: 'isbn', label: 'Por ISBN' },
    { value: 'year', label: 'Por año de publicación' },
  ];

  constructor(
    private openLibraryService: OpenLibraryService,
    private router: Router
  ) {}

  async searchBooks() {
    const trimmedQuery = this.query.trim();

    if (!trimmedQuery) {
      this.errorMessage = 'Escribe un término de búsqueda.';
      this.results = [];
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.results = [];

    this.openLibraryService.searchBooks(this.searchField, trimmedQuery).subscribe({
      next: response => {
        this.results = response.docs ?? [];
        if (this.results.length === 0) {
          this.errorMessage = 'No se encontraron libros para esa búsqueda.';
        }
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'No se pudo consultar Open Library. Intenta de nuevo.';
        this.isLoading = false;
      }
    });
  }

  openDetail(result: OpenLibrarySearchResult) {
    this.router.navigate(['/tabs/tab3'], {
      queryParams: { workKey: result.key }
    });
  }

  getCoverUrl(coverId?: number) {
    return this.openLibraryService.getCoverUrl(coverId);
  }

}
