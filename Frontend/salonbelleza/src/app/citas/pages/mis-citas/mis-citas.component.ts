import { Component, OnInit } from '@angular/core';
import { CitaService } from '../../services/cita.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Cita } from '../../models/cita.model';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-mis-citas',
  templateUrl: './mis-citas.component.html',
  styleUrls: ['./mis-citas.component.css'],
})
export class MisCitasComponent implements OnInit {
  citas: Cita[] = [];
  citasFiltradas: Cita[] = [];
  loading = true;
  esEmpleado = false;
  filtroEstado = 'todas';
  filtroFecha = 'todas';

  estados = [
    { valor: 'todas', texto: 'Todas' },
    { valor: 'pendiente', texto: 'Pendientes' },
    { valor: 'confirmada', texto: 'Confirmadas' },
    { valor: 'completada', texto: 'Completadas' },
    { valor: 'cancelada', texto: 'Canceladas' },
    { valor: 'no-presentado', texto: 'No Presentado' },
  ];

  opcionesFecha = [
    { valor: 'todas', texto: 'Todas las fechas' },
    { valor: 'hoy', texto: 'Hoy' },
    { valor: 'semana', texto: 'Esta semana' },
    { valor: 'mes', texto: 'Este mes' },
    { valor: 'futuro', texto: 'Futuras' },
    { valor: 'pasado', texto: 'Pasadas' },
  ];

  constructor(
    private citaService: CitaService,
    private authService: AuthService,
    private router: Router
  ) {
    this.esEmpleado = this.authService.tieneRol('empleado');
  }

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas(): void {
    this.loading = true;

    if (this.esEmpleado) {
      const empleadoId = this.authService.getUsuarioId();
      if (empleadoId) {
        this.citaService.getCitasPorEmpleado(empleadoId).subscribe({
          next: (citas) => {
            this.citas = citas;
            this.filtrarCitas();
            this.loading = false;
          },
          error: (err) => {
            console.error('Error al cargar citas:', err);
            this.loading = false;
          },
        });
      }
    } else {
      const clienteId = this.authService.getUsuarioId();
      if (clienteId) {
        this.citaService.getCitasPorCliente(clienteId).subscribe({
          next: (citas) => {
            this.citas = citas;
            this.filtrarCitas();
            this.loading = false;
          },
          error: (err) => {
            console.error('Error al cargar citas:', err);
            this.loading = false;
          },
        });
      }
    }
  }

  filtrarCitas(): void {
    let resultado = [...this.citas];

    // Filtrar por estado
    if (this.filtroEstado !== 'todas') {
      resultado = resultado.filter((c) => c.estado === this.filtroEstado);
    }

    // Filtrar por fecha
    const hoy = moment().startOf('day');
    switch (this.filtroFecha) {
      case 'hoy':
        resultado = resultado.filter((c) => moment(c.fecha).isSame(hoy, 'day'));
        break;
      case 'semana':
        resultado = resultado.filter((c) =>
          moment(c.fecha).isBetween(hoy.startOf('week'), hoy.endOf('week'))
        );
        break;
      case 'mes':
        resultado = resultado.filter((c) =>
          moment(c.fecha).isSame(hoy, 'month')
        );
        break;
      case 'futuro':
        resultado = resultado.filter((c) => moment(c.fecha).isSameOrAfter(hoy));
        break;
      case 'pasado':
        resultado = resultado.filter((c) => moment(c.fecha).isBefore(hoy));
        break;
    }

    // Ordenar por fecha más próxima primero
    resultado.sort((a, b) => moment(a.fecha).diff(moment(b.fecha)));

    this.citasFiltradas = resultado;
  }

  cambiarEstadoFiltro(): void {
    this.filtrarCitas();
  }

  cambiarFechaFiltro(): void {
    this.filtrarCitas();
  }

  cancelarCita(id: number): void {
    if (confirm('¿Estás seguro de cancelar esta cita?')) {
      this.citaService.cancelarCita(id).subscribe({
        next: () => {
          this.citas = this.citas.map((c) =>
            c.id === id ? { ...c, estado: 'cancelada' } : c
          );
          this.filtrarCitas();
        },
        error: (err) => console.error('Error al cancelar:', err),
      });
    }
  }

  verDetalle(id: number): void {
    this.router.navigate(['/citas/detalle', id]);
  }

  getEstadoTexto(estado: string): string {
    const estadoObj = this.estados.find((e) => e.valor === estado);
    return estadoObj ? estadoObj.texto : estado;
  }
}
