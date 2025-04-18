import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Añade este import
import { AnuncioService } from '../../services/anuncio.service';
import moment from 'moment';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
})
export class ReportesComponent implements OnInit {
  topAnuncios: any[] = [];
  historialAnuncios: any[] = [];
  loading = false;
  filtro = {
    tipoReporte: 'top5',
    fechaInicio: moment().subtract(1, 'month').format('YYYY-MM-DD'),
    fechaFin: moment().format('YYYY-MM-DD'),
  };

  constructor(
    private anuncioService: AnuncioService,
    private http: HttpClient // Inyecta HttpClient aquí
  ) {}

  ngOnInit(): void {
    this.cargarReporte();
  }

  cargarReporte(): void {
    this.loading = true;

    if (this.filtro.tipoReporte === 'top5') {
      this.anuncioService
        .getTopAnuncios(5, {
          inicio: this.filtro.fechaInicio,
          fin: this.filtro.fechaFin,
        })
        .subscribe({
          next: (data: any[]) => {
            this.topAnuncios = data;
            this.loading = false;
          },
          error: (err: any) => {
            console.error('Error al cargar reporte:', err);
            this.loading = false;
          },
        });
    } else {
      this.anuncioService.getHistorialAnuncios().subscribe({
        next: (data: any[]) => {
          this.historialAnuncios = data;
          this.loading = false;
        },
        error: (err: any) => {
          console.error('Error al cargar historial:', err);
          this.loading = false;
        },
      });
    }
  }

  generarReportePDF(): void {
    let url = `${this.anuncioService.apiUrl}/reportes/pdf`;

    if (this.filtro.tipoReporte === 'top5') {
      url += `?tipo=top5&inicio=${this.filtro.fechaInicio}&fin=${this.filtro.fechaFin}`;
    } else {
      url += '?tipo=historial';
    }

    this.http.get(url, { responseType: 'blob' }).subscribe((blob) => {
      const filename = `reporte-marketing-${new Date().toISOString()}.pdf`;
      saveAs(blob, filename);
    });
  }

  exportarAExcel(): void {
    let url = `${this.anuncioService.apiUrl}/reportes/excel`;

    if (this.filtro.tipoReporte === 'top5') {
      url += `?tipo=top5&inicio=${this.filtro.fechaInicio}&fin=${this.filtro.fechaFin}`;
    } else {
      url += '?tipo=historial';
    }

    this.http.get(url, { responseType: 'blob' }).subscribe((blob) => {
      const filename = `reporte-marketing-${new Date().toISOString()}.xlsx`;
      saveAs(blob, filename);
    });
  }
}
