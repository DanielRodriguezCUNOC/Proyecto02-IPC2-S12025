// clientes/lista-negra/lista-negra.component.ts
import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-lista-negra',
  templateUrl: './lista-negra.component.html',
  styleUrls: ['./lista-negra.component.css'],
})
export class ListaNegraComponent implements OnInit {
  enListaNegra = false;
  motivo: string = '';
  isLoading = true;

  constructor(
    private clienteService: ClienteService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.verificarListaNegra();
  }

  verificarListaNegra(): void {
    this.isLoading = true;
    this.clienteService.verificarListaNegra().subscribe({
      next: (data: { enLista: boolean; motivo: string }) => {
        this.enListaNegra = data.enLista;
        this.motivo = data.motivo || '';
        this.isLoading = false;
      },
      error: (err: any) => {
        this.alertService.mostrarError('Error al verificar estado');
        this.isLoading = false;
      },
    });
  }

  solicitarAprobacion(): void {
    this.isLoading = true;
    this.clienteService.solicitarAprobacion().subscribe({
      next: () => {
        this.alertService.mostrarExito('Solicitud enviada al administrador');
        this.isLoading = false;
      },
      error: (err: any) => {
        this.alertService.mostrarError('Error al enviar solicitud');
        this.isLoading = false;
      },
    });
  }
}
