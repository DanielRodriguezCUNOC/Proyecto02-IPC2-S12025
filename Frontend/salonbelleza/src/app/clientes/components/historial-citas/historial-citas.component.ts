// clientes/historial-citas/historial-citas.component.ts
import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-historial-citas',
  templateUrl: './historial-citas.component.html',
  styleUrls: ['./historial-citas.component.css'],
})
export class HistorialCitasComponent implements OnInit {
  citas: any[] = [];
  isLoading = true;
  filtroEstado = 'todas';

  constructor(
    private clienteService: ClienteService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.cargarHistorial();
  }

  cargarHistorial(): void {
    this.isLoading = true;
    this.clienteService.obtenerHistorialCitas().subscribe({
      next: (data: any[]) => {
        this.citas = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.alertService.mostrarError('Error al cargar historial de citas');
        this.isLoading = false;
      },
    });
  }

  filtrarCitas(estado: string): void {
    this.filtroEstado = estado;
  }

  get citasFiltradas(): any[] {
    if (this.filtroEstado === 'todas') {
      return this.citas;
    }
    return this.citas.filter((cita) => cita.estado === this.filtroEstado);
  }
}
