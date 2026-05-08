import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OpenLibraryService, OpenLibraryWorkDetail } from '../services/open-library.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit {
  isLoading = false;
  errorMessage = '';
  workKey = '';
  detail: OpenLibraryWorkDetail | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private openLibraryService: OpenLibraryService
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const key = params.get('workKey');

      if (!key) {
        this.errorMessage = 'No se encontró el libro seleccionado.';
        this.detail = null;
        return;
      }

      this.workKey = key;
      this.loadDetail(key);
    });
  }

  loadDetail(workKey: string) {
    this.isLoading = true;
    this.errorMessage = '';
    this.detail = null;

    this.openLibraryService.getWorkDetail(workKey).subscribe({
      next: detail => {
        this.detail = detail;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'No se pudo cargar el detalle del libro.';
        this.isLoading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/tabs/tab2']);
  }

  getDescription(): string {
    if (!this.detail?.description) {
      return '';
    }

    if (typeof this.detail.description === 'string') {
      return this.detail.description;
    }

    return this.detail.description.value ?? '';
  }

  getCoverUrl(): string {
    const coverId = this.detail?.covers?.[0];
    return this.openLibraryService.getCoverUrl(coverId, 'L');
  }

}
