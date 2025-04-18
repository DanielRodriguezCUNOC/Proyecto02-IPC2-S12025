import { Component, OnInit } from '@angular/core';
import { EmpleadoService, Empleado } from '../../services/empleado.service';
import { ServicioService } from '../../../servicios/services/servicio.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-empleado-list',
  templateUrl: './empleado-list.component.html',
  styleUrls: ['./empleado-list.component.css'],
})
export class EmpleadoListComponent implements OnInit {
  empleados: Empleado[] = [];
  loading = true;
  filtroEstado = 'activos';
  esAdministrador = false;

  constructor(
    private empleadoService: EmpleadoService,
    private servicioService: ServicioService,
    private authService: AuthService
  ) {
    this.esAdministrador = this.authService.tieneRol('admin');
  }

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados(): void {
    this.loading = true;
    if (this.filtroEstado === 'activos') {
      this.empleadoService.getEmpleadosActivos().subscribe({
        next: (empleados) => {
          this.empleados = empleados;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error al cargar empleados:', err);
          this.loading = false;
        },
      });
    } else {
      this.empleadoService.getEmpleados().subscribe({
        next: (empleados) => {
          this.empleados = empleados;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error al cargar empleados:', err);
          this.loading = false;
        },
      });
    }
  }

  cambiarEstado(id: number, estado: 'activo' | 'inactivo'): void {
    if (confirm(`¿Estás seguro de marcar como ${estado} a este empleado?`)) {
      this.empleadoService.cambiarEstadoEmpleado(id, estado).subscribe({
        next: () => {
          this.empleados = this.empleados.map((e) =>
            e.id === id ? { ...e, estado } : e
          );
        },
        error: (err) => console.error('Error al cambiar estado:', err),
      });
    }
  }

  getEspecialidades(especialidadesIds: number[]): string {
    // En una implementación real, deberías obtener los nombres de los servicios
    return especialidadesIds.join(', ');
  }
}
