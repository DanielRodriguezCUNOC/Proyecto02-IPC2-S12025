import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CitaService } from '../../services/cita.service';
import { DisponibilidadService } from '../../services/disponibilidad.service';
import { Cita, Servicio, Empleado } from '../../models/cita.model';
import { AuthService } from '../../../auth/auth.service';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-cita-form',
  templateUrl: './cita-form.component.html',
  styleUrls: ['./cita-form.component.css'],
})
export class CitaFormComponent implements OnInit {
  citaForm: FormGroup;
  isEditMode = false;
  citaId?: number;
  servicios: Servicio[] = [];
  empleados: Empleado[] = [];
  horariosDisponibles: string[] = [];
  loading = false;
  minDate: string;
  cita: any;

  constructor(
    private fb: FormBuilder,
    private citaService: CitaService,
    private disponibilidadService: DisponibilidadService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Configurar fecha mínima (hoy)
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];

    // Inicializar formulario
    this.citaForm = this.fb.group({
      servicioId: ['', Validators.required],
      empleadoId: ['', Validators.required],
      fecha: ['', [Validators.required, this.fechaValida]],
      hora: ['', Validators.required],
      notas: [''],
    });

    // Observar cambios en servicio para cargar empleados
    this.citaForm.get('servicioId')?.valueChanges.subscribe((servicioId) => {
      if (servicioId) {
        this.cargarEmpleadosPorServicio(servicioId);
        this.citaForm.get('empleadoId')?.reset();
      }
    });

    // Observar cambios en empleado y fecha para cargar disponibilidad
    this.citaForm.get('empleadoId')?.valueChanges.subscribe(() => {
      this.actualizarDisponibilidad();
    });

    this.citaForm.get('fecha')?.valueChanges.subscribe(() => {
      this.actualizarDisponibilidad();
    });
  }

  ngOnInit(): void {
    this.cargarServicios();

    // Verificar si estamos en modo edición
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.citaId = +params['id'];
        this.cargarCita(this.citaId);
      } else {
        // Si es nueva cita, establecer clienteId
        const clienteId = this.authService.getUsuarioId();
        if (clienteId) {
          this.citaForm.addControl('clienteId', this.fb.control(clienteId));
        }
      }
    });
  }

  fechaValida(control: any): { [key: string]: boolean } | null {
    const fecha = new Date(control.value);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fecha < hoy) {
      return { fechaInvalida: true };
    }
    return null;
  }

  cargarServicios(): void {
    this.citaService.getServicios().subscribe({
      next: (servicios) => {
        this.servicios = servicios;
      },
      error: (err) => console.error('Error al cargar servicios:', err),
    });
  }

  cargarEmpleadosPorServicio(servicioId: number): void {
    this.citaService.getEmpleadosPorServicio(servicioId).subscribe({
      next: (empleados) => {
        this.empleados = empleados;
      },
      error: (err) => console.error('Error al cargar empleados:', err),
    });
  }

  actualizarDisponibilidad(): void {
    const empleadoId = this.citaForm.get('empleadoId')?.value;
    const fecha = this.citaForm.get('fecha')?.value;

    if (empleadoId && fecha) {
      this.loading = true;
      this.disponibilidadService
        .getHorariosDisponibles(empleadoId, fecha)
        .subscribe({
          next: (horarios) => {
            this.horariosDisponibles = horarios;
            this.loading = false;
          },
          error: (err) => {
            console.error('Error al cargar disponibilidad:', err);
            this.loading = false;
          },
        });
    }
  }

  cargarCita(id: number): void {
    this.citaService.getCita(id).subscribe({
      next: (cita) => {
        // Cargar empleados para el servicio de la cita primero
        this.cargarEmpleadosPorServicio(cita.servicioId);

        // Llenar el formulario
        this.citaForm.patchValue({
          servicioId: cita.servicioId,
          empleadoId: cita.empleadoId,
          fecha: cita.fecha,
          hora: cita.horaInicio,
          notas: cita.notas,
        });

        // Forzar actualización de disponibilidad
        setTimeout(() => this.actualizarDisponibilidad(), 100);
      },
      error: (err) => console.error('Error al cargar cita:', err),
    });
  }

  onSubmit(): void {
    if (this.citaForm.valid) {
      const formValue = this.citaForm.value;
      const servicio = this.servicios.find(
        (s) => s.id === formValue.servicioId
      );

      if (!servicio) {
        alert('Servicio no encontrado');
        return;
      }

      const citaData: Partial<Cita> = {
        servicioId: formValue.servicioId,
        empleadoId: formValue.empleadoId,
        fecha: formValue.fecha,
        horaInicio: formValue.hora,
        horaFin: this.calcularHoraFin(formValue.hora, servicio.duracion),
        notas: formValue.notas,
        estado: 'pendiente',
      };

      if (this.isEditMode && this.citaId) {
        // Actualizar cita existente
        this.citaService.actualizarCita(this.citaId, citaData).subscribe({
          next: () => {
            alert('Cita actualizada con éxito');
            this.router.navigate(['/citas']);
          },
          error: (err) => console.error('Error al actualizar:', err),
        });
      } else {
        // Crear nueva cita
        this.citaService.crearCita(citaData as Omit<Cita, 'id'>).subscribe({
          next: () => {
            alert('Cita creada con éxito');
            this.router.navigate(['/citas']);
          },
          error: (err) => console.error('Error al crear:', err),
        });
      }
    }
  }

  calcularHoraFin(horaInicio: string, duracionMinutos: number): string {
    const [horas, minutos] = horaInicio.split(':').map(Number);
    const fecha = new Date();
    fecha.setHours(horas, minutos + duracionMinutos, 0, 0);

    const horasFin = fecha.getHours().toString().padStart(2, '0');
    const minutosFin = fecha.getMinutes().toString().padStart(2, '0');

    return `${horasFin}:${minutosFin}`;
  }

  getServicioSeleccionado(): Servicio | undefined {
    const servicioId = this.citaForm.get('servicioId')?.value;
    return this.servicios.find((s) => s.id === servicioId);
  }

  getEmpleadoSeleccionado(): Empleado | undefined {
    const empleadoId = this.citaForm.get('empleadoId')?.value;
    return this.empleados.find((e) => e.id === empleadoId);
  }

  getEspecialidades(empleado: Empleado): string {
    return empleado.especialidades
      .map((id) => {
        const servicio = this.servicios.find((s) => s.id === id);
        return servicio ? servicio.nombre : '';
      })
      .filter((nombre) => nombre)
      .join(', ');
  }

  getNombreServicio(id: number): string {
    const servicio = this.servicios.find((s) => s.id === id);
    return servicio ? servicio.nombre : 'Servicio no encontrado';
  }
}
