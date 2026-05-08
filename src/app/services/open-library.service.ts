import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export type OpenLibrarySearchField = 'title' | 'author' | 'subject' | 'isbn' | 'year';

export interface OpenLibrarySearchResult {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  edition_count?: number;
  language?: string[];
  subject?: string[];
}

export interface OpenLibrarySearchResponse {
  numFound: number;
  start: number;
  docs: OpenLibrarySearchResult[];
}

export interface OpenLibraryWorkDetail {
  key: string;
  title: string;
  description?: string | { value?: string };
  subjects?: string[];
  covers?: number[];
  created?: {
    value?: string;
  };
  last_modified?: {
    value?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class OpenLibraryService {
  private readonly baseUrl = 'https://openlibrary.org';
  private readonly coverUrl = 'https://covers.openlibrary.org/b/id';

  constructor(private http: HttpClient) {}

  searchBooks(field: OpenLibrarySearchField, query: string): Observable<OpenLibrarySearchResponse> {
    let params = new HttpParams().set('limit', '20');

    switch (field) {
      case 'title':
        params = params.set('title', query);
        break;
      case 'author':
        params = params.set('author', query);
        break;
      case 'subject':
        params = params.set('subject', query);
        break;
      case 'isbn':
        params = params.set('isbn', query);
        break;
      case 'year':
        params = params.set('first_publish_year', query);
        break;
    }

    return this.http.get<OpenLibrarySearchResponse>(`${this.baseUrl}/search.json`, { params });
  }

  getWorkDetail(workKey: string): Observable<OpenLibraryWorkDetail> {
    const normalizedKey = workKey.replace('/works/', '');
    return this.http.get<OpenLibraryWorkDetail>(`${this.baseUrl}/works/${normalizedKey}.json`);
  }

  getCoverUrl(coverId?: number, size: 'S' | 'M' | 'L' = 'M'): string {
    if (!coverId) {
      return 'assets/icon/icon.png';
    }

    return `${this.coverUrl}/${coverId}-${size}.jpg`;
  }
}
