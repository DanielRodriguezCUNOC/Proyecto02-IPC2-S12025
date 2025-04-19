import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Empleado } from '../models/empleado.model';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  private apiUrl = 'http://localhost:3000/api/empleados';

  constructor(private http: HttpClient) {}

  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.apiUrl);
  }

  getEmpleadosActivos(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${this.apiUrl}/activos`);
  }

  getEmpleado(id: number): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.apiUrl}/${id}`);
  }

  crearEmpleado(empleado: Omit<Empleado, 'id'>): Observable<Empleado> {
    return this.http.post<Empleado>(this.apiUrl, empleado);
  }

  actualizarEmpleado(
    id: number,
    empleado: Partial<Empleado>
  ): Observable<Empleado> {
    return this.http.put<Empleado>(`${this.apiUrl}/${id}`, empleado);
  }

  cambiarEstadoEmpleado(
    id: number,
    estado: 'activo' | 'inactivo'
  ): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/estado`, { estado });
  }

  getEmpleadosPorServicio(servicioId: number): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(
      `${this.apiUrl}/por-servicio/${servicioId}`
    );
  }

  getHorariosDisponibles(
    empleadoId: number,
    fecha: string
  ): Observable<string[]> {
    return this.http
      .get<{ horarios: string[] }>(
        `${this.apiUrl}/${empleadoId}/horarios-disponibles?fecha=${fecha}`
      )
      .pipe(map((response) => response.horarios));
  }
}
export type { Empleado };
