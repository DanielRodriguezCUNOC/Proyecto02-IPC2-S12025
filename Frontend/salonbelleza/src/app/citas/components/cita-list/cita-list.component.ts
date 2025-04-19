import { Component, OnInit } from '@angular/core';
import { CitaService } from '../../services/cita.service';
import { Cita } from '../../models/cita.model';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cita-list',
  templateUrl: './cita-list.component.html',
  styleUrls: ['./cita-list.component.css'],
})
export class CitaListComponent implements OnInit {
  citas: Cita[] = [];
  loading = true;
  esEmpleado = false;
  esCliente = false;

  constructor(
    private citaService: CitaService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.esEmpleado = this.authService.tieneRol('empleado');
    this.esCliente = this.authService.tieneRol('cliente');

    if (this.esEmpleado) {
      this.cargarCitasEmpleado();
    } else if (this.esCliente) {
      this.cargarCitasCliente();
    } else {
      this.cargarTodasLasCitas();
    }
  }

  cargarTodasLasCitas(): void {
    this.citaService.getCitas().subscribe({
      next: (citas) => {
        this.citas = citas;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar citas:', err);
        this.loading = false;
      },
    });
  }

  cargarCitasCliente(): void {
    const clienteId = this.authService.getUsuarioId();
    if (clienteId) {
      this.citaService.getCitasPorCliente(clienteId).subscribe({
        next: (citas) => {
          this.citas = citas;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error al cargar citas:', err);
          this.loading = false;
        },
      });
    }
  }

  cargarCitasEmpleado(): void {
    const empleadoId = this.authService.getUsuarioId();
    // Implementar método en servicio para obtener citas por empleado
  }

  editarCita(id: number): void {
    this.router.navigate(['/citas/editar', id]);
  }

  cancelarCita(id: number): void {
    if (confirm('¿Estás seguro de cancelar esta cita?')) {
      this.citaService.cancelarCita(id).subscribe({
        next: () => {
          this.citas = this.citas.map((c) =>
            c.id === id ? { ...c, estado: 'cancelada' } : c
          );
        },
        error: (err) => console.error('Error al cancelar:', err),
      });
    }
  }

  completarCita(id: number): void {
    this.citaService.actualizarCita(id, { estado: 'completada' }).subscribe({
      next: () => {
        this.citas = this.citas.map((c) =>
          c.id === id ? { ...c, estado: 'completada' } : c
        );
      },
      error: (err) => console.error('Error al completar:', err),
    });
  }

  marcarNoPresentado(id: number): void {
    this.citaService.actualizarCita(id, { estado: 'no-presentado' }).subscribe({
      next: () => {
        this.citas = this.citas.map((c) =>
          c.id === id ? { ...c, estado: 'no-presentado' } : c
        );
      },
      error: (err) => console.error('Error al marcar:', err),
    });
  }
}
