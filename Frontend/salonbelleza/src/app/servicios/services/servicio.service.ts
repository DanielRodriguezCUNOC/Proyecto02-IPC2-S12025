import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Catalogo, Servicio } from '../models/servicio.model';

@Injectable({
  providedIn: 'root',
})
export class ServicioService {
  private apiUrl = 'http://localhost:3000/api/servicios';

  constructor(private http: HttpClient) {}

  getServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.apiUrl);
  }

  getServicio(id: number): Observable<Servicio> {
    return this.http.get<Servicio>(`${this.apiUrl}/${id}`);
  }

  crearServicio(servicio: Omit<Servicio, 'id'>): Observable<Servicio> {
    return this.http.post<Servicio>(this.apiUrl, servicio);
  }
  actualizarServicio(
    id: number,
    servicio: Partial<Servicio>
  ): Observable<Servicio> {
    return this.http.put<Servicio>(`${this.apiUrl}/${id}`, servicio);
  }

  cambiarEstadoServicio(
    id: number,
    estado: 'activo' | 'inactivo'
  ): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/estado`, { estado });
  }

  // Métodos para catálogos
  agregarCatalogo(
    servicioId: number,
    catalogo: Omit<Catalogo, 'id'>
  ): Observable<Catalogo> {
    return this.http.post<Catalogo>(
      `${this.apiUrl}/${servicioId}/catalogos`,
      catalogo
    );
  }

  eliminarCatalogo(servicioId: number, catalogoId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${servicioId}/catalogos/${catalogoId}`
    );
  }

  subirArchivoCatalogo(
    servicioId: number,
    archivo: File
  ): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    return this.http.post<{ url: string }>(
      `${this.apiUrl}/${servicioId}/catalogos/upload`,
      formData
    );
  }

  getServiciosActivos(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${this.apiUrl}/activos`);
  }

  getServiciosPorCategoria(categoria: string): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${this.apiUrl}/categoria/${categoria}`);
  }

  getCatalogoPdf(catalogoId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/catalogos/${catalogoId}/pdf`, {
      responseType: 'blob',
    });
  }
}
export type { Servicio };
export type { Catalogo };
