import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Anuncio } from '../models/anuncio.model';

@Injectable({
  providedIn: 'root',
})
export class AnuncioService {
  public apiUrl = 'http://localhost:3000/api/anuncios'; // Asegúrate que sea pública

  constructor(private http: HttpClient) {}

  // ... otros métodos existentes ...

  /**
   * Obtiene los anuncios más mostrados
   * @param limit Número máximo de resultados
   * @param periodo Opcional: { inicio: string, fin: string }
   */
  getTopAnuncios(
    limit: number,
    periodo?: { inicio: string; fin: string }
  ): Observable<Anuncio[]> {
    let url = `${this.apiUrl}/top?limit=${limit}`;
    if (periodo) {
      url += `&inicio=${periodo.inicio}&fin=${periodo.fin}`;
    }
    return this.http.get<Anuncio[]>(url);
  }

  /**
   * Obtiene el historial completo de anuncios
   */
  getHistorialAnuncios(): Observable<Anuncio[]> {
    return this.http.get<Anuncio[]>(`${this.apiUrl}/historial`);
  }

  getAnunciosActivos(): Observable<Anuncio[]> {
    return this.http.get<Anuncio[]>(`${this.apiUrl}/activos`);
  }
}
