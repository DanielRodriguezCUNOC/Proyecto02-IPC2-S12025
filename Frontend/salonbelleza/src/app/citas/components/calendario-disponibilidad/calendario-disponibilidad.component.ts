import { Component, OnInit } from '@angular/core';
import { DisponibilidadService } from '../../services/disponibilidad.service';
import { CitaService } from '../../services/cita.service';
import { AuthService } from '../../../auth/services/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-calendario-disponibilidad',
  templateUrl: './calendario-disponibilidad.component.html',
  styleUrls: ['./calendario-disponibilidad.component.css']
})
export class CalendarioDisponibilidadComponent implements OnInit {
  fechaSeleccionada: string;
  horarios: any[] = [];
  empleadoId: number;
  loading = false;

  constructor(
    private disponibilidadService: DisponibilidadService,
    private citaService: CitaService,
    private authService: AuthService
  ) {
    this.fechaSeleccionada = moment().format('YYYY-MM-DD');
    this.empleadoId = this.authService.getUsuarioId() || 0;
  }

  ngOnInit(): void {
    this.cargarDisponibilidad();
  }

  cargarDisponibilidad(): void {
    this.loading = true;
    this.disponibilidadService.getCitasPorEmpleado(this.empleadoId, this.fechaSeleccionada)
      .subscribe({
        next: (citas) => {
          this.horarios = this.generarHorario(citas);
          this.loading = false;
        },
        error: (err) => {
          console.error('Error al cargar disponibilidad:', err);
          this.loading = false;
        }
      });
  }

  generarHorario(citas: any[]): any[] {
    // Suponiendo horario de 9am a 6pm con intervalos de 30 minutos
    const horarios = [];
    const horaInicio = 9;
    const horaFin = 18;
    
    for (let hora = horaInicio; hora < horaFin; hora++) {
      for (let minuto = 0; minuto < 60; minuto += 30) {
        const horaStr