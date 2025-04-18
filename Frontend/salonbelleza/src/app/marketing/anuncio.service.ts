import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Anuncio } from './models/anuncio.model';

@Injectable({
  providedIn: 'root',
})
export class AnuncioService {
  private apiUrl = 'http://localhost:3000/api/anuncios';

  constructor(private http: HttpClient) {}

  getAnuncios(): Observable<Anuncio[]> {
    return this.http.get<Anuncio[]>(this.apiUrl);
  }

  getAnunciosActivos(): Observable<Anuncio[]> {
    return this.http.get<Anuncio[]>(`${this.apiUrl}/activos`);
  }

  getAnuncio(id: number): Observable<Anuncio> {
    return this.http.get<Anuncio>(`${this.apiUrl}/${id}`);
  }

  crearAnuncio(anuncio: Omit<Anuncio, 'id'>): Observable<Anuncio> {
    return this.http.post<Anuncio>(this.apiUrl, anuncio);
  }

  actualizarAnuncio(
    id: number,
    anuncio: Partial<Anuncio>
  ): Observable<Anuncio> {
    return this.http.put<Anuncio>(`${this.apiUrl}/${id}`, anuncio);
  }

  cambiarEstadoAnuncio(
    id: number,
    estado: 'activo' | 'inactivo'
  ): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/estado`, { estado });
  }

  // Reportes
  getTopAnuncios(
    top: number,
    periodo?: { inicio: string; fin: string }
  ): Observable<any[]> {
    let url = `${this.apiUrl}/reportes/top?limit=${top}`;
    if (periodo) {
      url += `&inicio=${periodo.inicio}&fin=${periodo.fin}`;
    }
    return this.http.get<any[]>(url);
  }

  getHistorialAnuncios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reportes/historial`);
  }
}
