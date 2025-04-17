import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cita } from '../models/cita.model';

@Injectable({
  providedIn: 'root',
})
export class DisponibilidadService {
  private apiUrl = 'http://localhost:3000/api/disponibilidad'; // Ajusta según tu backend

  constructor(private http: HttpClient) {}

  getHorariosDisponibles(
    empleadoId: number,
    fecha: string
  ): Observable<string[]> {
    return this.http.get<string[]>(
      `${this.apiUrl}/${empleadoId}?fecha=${fecha}`
    );
  }

  verificarDisponibilidad(
    empleadoId: number,
    fecha: string,
    horaInicio: string
  ): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.apiUrl}/verificar/${empleadoId}?fecha=${fecha}&horaInicio=${horaInicio}`
    );
  }

  getCitasPorEmpleado(empleadoId: number, fecha: string): Observable<Cita[]> {
    return this.http.get<Cita[]>(
      `${this.apiUrl}/citas/${empleadoId}?fecha=${fecha}`
    );
  }
}
