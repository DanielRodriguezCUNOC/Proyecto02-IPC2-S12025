// reporte-viewer.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { ReporteService } from '../../../services/reporte.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-reporte-viewer',
  templateUrl: './reporte-viewer.component.html',
  styleUrls: ['./reporte-viewer.component.css'],
})
export class ReporteViewerComponent implements OnInit {
  @Input() reporteId!: string;
  pdfUrl: SafeResourceUrl | null = null;
  isLoading = false;
  mostrarFiltros = false;
  filtros: any = {};

  constructor(
    private reporteService: ReporteService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.generarReporte();
  }

  generarReporte(): void {
    this.isLoading = true;
    this.reporteService.generarReporte(this.reporteId, this.filtros).subscribe({
      next: (blob: Blob | MediaSource) => {
        const url = URL.createObjectURL(blob);
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error al generar reporte', err);
        this.isLoading = false;
      },
    });
  }

  aplicarFiltros(): void {
    this.generarReporte();
    this.mostrarFiltros = false;
  }
}
