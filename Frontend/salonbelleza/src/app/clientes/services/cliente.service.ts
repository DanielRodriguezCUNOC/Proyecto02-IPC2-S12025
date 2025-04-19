// clientes/cliente.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = `${environment.apiUrl}/clientes`;

  constructor(private http: HttpClient) {}

  obtenerPerfil(): Observable<any> {
    return this.http.get(`${this.apiUrl}/perfil`);
  }

  actualizarPerfil(datos: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/perfil`, datos);
  }

  obtenerHistorialCitas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/citas`);
  }

  obtenerFacturas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/facturas`);
  }

  verificarListaNegra(): Observable<{ enLista: boolean; motivo: string }> {
    return this.http.get<{ enLista: boolean; motivo: string }>(
      `${this.apiUrl}/lista-negra`
    );
  }

  reservarCita(datosCita: {
    servicioId: number;
    empleadoId: number;
    fecha: string;
    hora: string;
    notas?: string;
  }): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.apiUrl}/reservas`,
      datosCita
    );
  }
  descargarFactura(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/facturas/${id}`, {
      responseType: 'blob',
    });
  }

  solicitarAprobacion(): Observable<any> {
    return this.http.post(`${this.apiUrl}/solicitar-aprobacion`, {});
  }

  getInteresesCliente(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/intereses`);
  }

  cancelarCita(citaId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/citas/${citaId}`);
  }
}
