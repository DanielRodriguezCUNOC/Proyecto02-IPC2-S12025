import { Component, OnInit } from '@angular/core';
import { ServicioService, Servicio } from '../../services/servicio.service';

@Component({
  selector: 'app-servicio-list',
  templateUrl: './servicio-list.component.html',
  styleUrls: ['./servicio-list.component.css'],
})
export class ServicioListComponent implements OnInit {
  servicios: Servicio[] = [];
  loading = true;

  constructor(private servicioService: ServicioService) {}

  ngOnInit(): void {
    this.cargarServicios();
  }

  cargarServicios(): void {
    this.loading = true;
    this.servicioService.getServicios().subscribe({
      next: (servicios) => {
        this.servicios = servicios;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar servicios:', err);
        this.loading = false;
      },
    });
  }
}
