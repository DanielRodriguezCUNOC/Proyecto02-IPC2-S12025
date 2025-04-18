import { Component, Input, OnInit } from '@angular/core';
import { Cita, Servicio, Empleado, Cliente } from '../../models/cita.model';
import { CitaService } from '../../services/cita.service';

@Component({
  selector: 'app-confirmacion-cita',
  templateUrl: './confirmacion-cita.component.html',
  styleUrls: ['./confirmacion-cita.component.css'],
})
export class ConfirmacionCitaComponent implements OnInit {
  @Input() cita!: Cita;
  servicio?: Servicio;
  empleado?: Empleado;
  cliente?: Cliente;
  loading = true;

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    if (this.cita) {
      this.citaService
        .getServicio(this.cita.servicioId)
        .subscribe((servicio) => {
          this.servicio = servicio;
        });

      this.citaService
        .getEmpleado(this.cita.empleadoId)
        .subscribe((empleado) => {
          this.empleado = empleado;
        });

      this.citaService.getCliente(this.cita.clienteId).subscribe((cliente) => {
        this.cliente = cliente;
        this.loading = false;
      });
    }
  }

  descargarPDF(): void {
    if (this.cita?.id) {
      this.citaService
        .generarComprobanteCita(this.cita.id)
        .subscribe((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `comprobante-cita-${this.cita.id}.pdf`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        });
    }
  }
}
