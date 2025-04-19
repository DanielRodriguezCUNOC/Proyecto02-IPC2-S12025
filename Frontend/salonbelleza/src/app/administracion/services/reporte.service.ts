// reporte.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReporteService {
  private apiUrl = 'http://localhost:3000/api/reportes';

  constructor(private http: HttpClient) {}

  getReportesDisponibles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  generarReporte(reporteId: string, params: any = {}): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${reporteId}`, {
      params,
      responseType: 'blob',
    });
  }
}
