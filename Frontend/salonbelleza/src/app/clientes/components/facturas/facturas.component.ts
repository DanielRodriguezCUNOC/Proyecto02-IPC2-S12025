// clientes/facturas/facturas.component.ts
import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css'],
})
export class FacturasComponent implements OnInit {
  facturas: any[] = [];
  isLoading = true;

  constructor(
    private clienteService: ClienteService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.cargarFacturas();
  }

  cargarFacturas(): void {
    this.isLoading = true;
    this.clienteService.obtenerFacturas().subscribe({
      next: (data: any[]) => {
        this.facturas = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.alertService.mostrarError('Error al cargar facturas');
        this.isLoading = false;
      },
    });
  }

  descargarFactura(id: string): void {
    this.clienteService.descargarFactura(id).subscribe({
      next: (data: BlobPart) => {
        // Lógica para descargar el PDF
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      },
      error: (err: any) => {
        this.alertService.mostrarError('Error al descargar factura');
      },
    });
  }
}
