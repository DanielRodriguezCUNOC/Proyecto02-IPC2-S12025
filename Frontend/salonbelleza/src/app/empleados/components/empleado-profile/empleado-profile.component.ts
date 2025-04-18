import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpleadoService, Empleado } from '../../services/empleado.service';
import { ServicioService } from '../../../servicios/services/servicio.service';

@Component({
  selector: 'app-empleado-profile',
  templateUrl: './empleado-profile.component.html',
  styleUrls: ['./empleado-profile.component.css'],
})
export class EmpleadoProfileComponent implements OnInit {
  empleado?: Empleado;
  loading = true;
  serviciosEspecialidad: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private empleadoService: EmpleadoService,
    private servicioService: ServicioService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cargarEmpleado(+id);
    }
  }

  cargarEmpleado(id: number): void {
    this.loading = true;
    this.empleadoService.getEmpleado(id).subscribe({
      next: (empleado) => {
        this.empleado = empleado;
        this.cargarServiciosEspecialidad(empleado.especialidades);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar empleado:', err);
        this.loading = false;
      },
    });
  }

  cargarServiciosEspecialidad(especialidadesIds: number[]): void {
    // Implementación simplificada - en una app real deberías tener un endpoint específico
    this.servicioService.getServicios().subscribe({
      next: (servicios: any[]) => {
        this.serviciosEspecialidad = servicios.filter((s: { id: number }) =>
          especialidadesIds.includes(s.id!)
        );
      },
      error: (err: any) => console.error('Error al cargar servicios:', err),
    });
  }

  getDiaSemana(dia: number): string {
    const dias = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ];
    return dias[dia] || '';
  }
}
