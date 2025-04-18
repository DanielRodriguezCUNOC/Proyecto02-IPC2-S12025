import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../services/servicio.service';
import { Servicio } from '../../models/servicio.model';

@Component({
  selector: 'app-servicio-list-client',
  templateUrl: './servicio-list-client.component.html',
  styleUrls: ['./servicio-list-client.component.css'],
})
export class ServicioListClientComponent implements OnInit {
  servicios: Servicio[] = [];
  categorias: string[] = [];
  categoriaSeleccionada = 'todas';
  loading = true;

  constructor(private servicioService: ServicioService) {}

  ngOnInit(): void {
    this.cargarServicios();
  }

  cargarServicios(): void {
    this.loading = true;
    this.servicioService.getServiciosActivos().subscribe({
      next: (servicios) => {
        this.servicios = servicios;
        this.categorias = this.obtenerCategoriasUnicas(servicios);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar servicios:', err);
        this.loading = false;
      },
    });
  }

  obtenerCategoriasUnicas(servicios: Servicio[]): string[] {
    const categorias = servicios.map((s) => s.categoria);
    return [...new Set(categorias)];
  }

  filtrarServicios(): Servicio[] {
    if (this.categoriaSeleccionada === 'todas') {
      return this.servicios;
    }
    return this.servicios.filter(
      (s) => s.categoria === this.categoriaSeleccionada
    );
  }
}
