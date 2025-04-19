// ver-catalogo.component.ts
import { Component } from '@angular/core';
import { ServicioService } from '../../../servicios/services/servicio.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-ver-catalogo',
  templateUrl: './ver-catalogo.component.html',
  styleUrls: ['./ver-catalogo.component.css'],
})
export class VerCatalogoComponent {
  pdfUrl: SafeResourceUrl | null = null;
  isLoading = false;

  constructor(
    private servicioService: ServicioService,
    private sanitizer: DomSanitizer
  ) {}

  cargarCatalogo(servicioId: number): void {
    this.isLoading = true;
    this.servicioService.getCatalogoPdf(servicioId).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar catálogo', err);
        this.isLoading = false;
      },
    });
  }

  limpiarCatalogo(): void {
    if (this.pdfUrl) {
      URL.revokeObjectURL(this.pdfUrl.toString());
      this.pdfUrl = null;
    }
  }

  ngOnDestroy(): void {
    this.limpiarCatalogo();
  }
}
