import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../../clientes/services/cliente.service';
import { ServicioService } from '../../../servicios/services/servicio.service';
import { EmpleadoService } from '../../../empleados/services/empleado.service';
import { AlertService } from '../../../shared/services/alert.service';
import { Servicio } from '../../../servicios/models/servicio.model';
import { Empleado } from '../../../empleados/models/empleado.model';
import { VerCatalogoComponent } from '../ver-catalogo/ver-catalogo.component';

@Component({
  selector: 'app-reservar-cita',
  templateUrl: './reservar-cita.component.html',
  styleUrls: ['./reservar-cita.component.css'],
})
export class ReservarCitaComponent implements OnInit {
  reservaForm: FormGroup;
  servicios: Servicio[] = [];
  empleados: Empleado[] = [];
  horariosDisponibles: string[] = [];
  isLoading = false;
  today = new Date();

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private servicioService: ServicioService,
    private empleadoService: EmpleadoService,
    private alertService: AlertService,
    private catalogoComponent: VerCatalogoComponent
  ) {
    this.reservaForm = this.fb.group({
      servicioId: ['', Validators.required],
      empleadoId: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      notas: [''],
    });
  }

  ngOnInit(): void {
    this.cargarServiciosActivos();
    this.verificarEstadoListaNegra();
  }

  cargarServiciosActivos(): void {
    this.isLoading = true;
    this.servicioService.getServiciosActivos().subscribe({
      next: (servicios: Servicio[]) => {
        this.servicios = servicios;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.alertService.mostrarError('Error al cargar servicios');
        this.isLoading = false;
      },
    });
  }

  verificarEstadoListaNegra(): void {
    this.clienteService.verificarListaNegra().subscribe({
      next: (data) => {
        if (data.enLista) {
          this.alertService.mostrarError(
            `No puedes reservar citas: ${data.motivo}`
          );
          // Deshabilitar el formulario si está en lista negra
          this.reservaForm.disable();
        }
      },
    });
  }

  onServicioChange(servicioId: string): void {
    const id = Number(servicioId);
    if (!isNaN(id)) {
      this.cargarEmpleadosPorServicio(id);
      this.reservaForm.get('empleadoId')?.reset();
      this.reservaForm.get('fecha')?.reset();
      this.reservaForm.get('hora')?.reset();
      this.horariosDisponibles = [];
    }
  }

  cargarEmpleadosPorServicio(servicioId: number): void {
    this.isLoading = true;
    this.empleadoService.getEmpleadosPorServicio(servicioId).subscribe({
      next: (empleados: Empleado[]) => {
        this.empleados = empleados;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.alertService.mostrarError('Error al cargar empleados');
        this.isLoading = false;
      },
    });
  }

  onFechaChange(): void {
    const fecha = this.reservaForm.get('fecha')?.value;
    const empleadoId = this.reservaForm.get('empleadoId')?.value;

    if (fecha && empleadoId) {
      this.cargarHorariosDisponibles(Number(empleadoId), fecha);
    } else {
      this.horariosDisponibles = [];
    }
  }

  cargarHorariosDisponibles(empleadoId: number, fecha: string): void {
    this.isLoading = true;
    this.empleadoService.getHorariosDisponibles(empleadoId, fecha).subscribe({
      next: (horarios: string[]) => {
        this.horariosDisponibles = horarios;
        this.reservaForm.get('hora')?.setValue('');
        this.isLoading = false;
      },
      error: (err: any) => {
        this.alertService.mostrarError('Error al cargar horarios disponibles');
        this.horariosDisponibles = [];
        this.isLoading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.reservaForm.valid) {
      this.isLoading = true;
      const reservaData = {
        servicioId: Number(this.reservaForm.value.servicioId),
        empleadoId: Number(this.reservaForm.value.empleadoId),
        fecha: this.reservaForm.value.fecha,
        hora: this.reservaForm.value.hora,
        notas: this.reservaForm.value.notas,
      };

      this.clienteService.reservarCita(reservaData).subscribe({
        next: () => {
          this.alertService.mostrarExito('Cita reservada exitosamente');
          this.reservaForm.reset();
          this.empleados = [];
          this.horariosDisponibles = [];
          this.isLoading = false;
        },
        error: (err: { error: { message: any } }) => {
          this.alertService.mostrarError(
            err.error.message || 'Error al reservar cita'
          );
          this.isLoading = false;
        },
      });
    }
  }

  verCatalogo(servicioId: number): void {
    this.catalogoComponent.cargarCatalogo(servicioId);
  }
}
