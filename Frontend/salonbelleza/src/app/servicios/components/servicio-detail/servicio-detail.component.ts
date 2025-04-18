import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ServicioService,
  Servicio,
  Catalogo,
} from '../../services/servicio.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-servicio-detail',
  templateUrl: './servicio-detail.component.html',
  styleUrls: ['./servicio-detail.component.css'],
})
export class ServicioDetailComponent implements OnInit {
  servicio?: Servicio;
  loading = false;
  pdfPreviewUrl?: SafeResourceUrl;
  catalogoSeleccionado?: Catalogo;

  constructor(
    private route: ActivatedRoute,
    private servicioService: ServicioService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loading = true;
      this.servicioService.getServicio(+id).subscribe({
        next: (servicio) => {
          this.servicio = servicio;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error al cargar servicio:', err);
          this.loading = false;
        },
      });
    }
  }

  verCatalogo(catalogo: Catalogo): void {
    this.catalogoSeleccionado = catalogo;
    this.servicioService.getCatalogoPdf(catalogo.id!).subscribe((blob) => {
      const url = URL.createObjectURL(blob);
      this.pdfPreviewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    });
  }

  descargarCatalogo(catalogo: Catalogo): void {
    this.servicioService.getCatalogoPdf(catalogo.id!).subscribe((blob) => {
      saveAs(blob, `catalogo-${catalogo.nombre}.pdf`);
    });
  }

  cerrarVisualizador(): void {
    this.catalogoSeleccionado = undefined;
    this.pdfPreviewUrl = undefined;
  }
}
