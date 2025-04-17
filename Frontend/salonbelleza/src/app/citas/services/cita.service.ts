import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cita, Servicio, Empleado, Cliente } from '../models/cita.model';

@Injectable({
  providedIn: 'root',
})
export class CitaService {
  private apiUrl = 'http://localhost:3000/api/citas'; // Ajusta según tu backend

  constructor(private http: HttpClient) {}

  // Citas
  getCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrl}`);
  }

  getCitasPorCliente(clienteId: number): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrl}?clienteId=${clienteId}`);
  }

  getCita(id: number): Observable<Cita> {
    return this.http.get<Cita>(`${this.apiUrl}/${id}`);
  }

  crearCita(cita: Omit<Cita, 'id'>): Observable<Cita> {
    return this.http.post<Cita>(this.apiUrl, cita);
  }

  actualizarCita(id: number, cita: Partial<Cita>): Observable<Cita> {
    return this.http.put<Cita>(`${this.apiUrl}/${id}`, cita);
  }

  cancelarCita(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/cancelar`, {});
  }

  // Catálogos
  getServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${this.apiUrl}/servicios`);
  }

  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${this.apiUrl}/empleados`);
  }

  getEmpleadosPorServicio(servicioId: number): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(
      `${this.apiUrl}/empleados?servicioId=${servicioId}`
    );
  }

  getCitasPorEmpleado(empleadoId: number): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrl}/empleados/${empleadoId}`);
  }

  getServicio(id: number): Observable<Servicio> {
    return this.http.get<Servicio>(`${this.apiUrl}/servicios/${id}`);
  }

  getEmpleado(id: number): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.apiUrl}/empleados/${id}`);
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/clientes/${id}`);
  }

  generarComprobanteCita(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/comprobante`, {
      responseType: 'blob',
    });
  }
}
