// reporte-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ReporteService } from '../../../services/reporte.service';
import { AlertService } from '../../../../shared/services/alert.service';

@Component({
  selector: 'app-reporte-list',
  templateUrl: './reporte-list.component.html',
  styleUrls: ['./reporte-list.component.css'],
})
export class ReporteListComponent implements OnInit {
  reportes: any[] = [];
  isLoading = true;
  filtros: any = {};
  reporteSeleccionado: string | null = null;

  constructor(
    private reporteService: ReporteService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.cargarReportes();
  }

  cargarReportes(): void {
    this.isLoading = true;
    this.reporteService.getReportesDisponibles().subscribe({
      next: (reportes: any[]) => {
        this.reportes = reportes;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.alertService.mostrarError('Error al cargar reportes');
        this.isLoading = false;
      },
    });
  }

  generarReporte(reporteId: string): void {
    this.reporteSeleccionado = reporteId;
    // Los parámetros específicos se manejarán en el componente viewer
  }
}
