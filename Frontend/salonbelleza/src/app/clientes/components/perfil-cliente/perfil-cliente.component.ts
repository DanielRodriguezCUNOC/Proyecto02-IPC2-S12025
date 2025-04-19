// clientes/perfil-cliente/perfil-cliente.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-perfil-cliente',
  templateUrl: './perfil-cliente.component.html',
  styleUrls: ['./perfil-cliente.component.css'],
})
export class PerfilClienteComponent implements OnInit {
  perfilForm: FormGroup;
  cliente: any;
  isLoading = true;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private alertService: AlertService
  ) {
    this.perfilForm = this.fb.group({
      dpi: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      foto: [''],
      hobbies: [''],
      gustos: [''],
      descripcion: [''],
    });
  }

  ngOnInit(): void {
    this.cargarPerfil();
  }

  cargarPerfil(): void {
    this.clienteService.obtenerPerfil().subscribe({
      next: (data: { [key: string]: any }) => {
        this.cliente = data;
        this.perfilForm.patchValue(data);
        this.isLoading = false;
      },
      error: (err: any) => {
        this.alertService.mostrarError('Error al cargar perfil');
        this.isLoading = false;
      },
    });
  }

  actualizarPerfil(): void {
    if (this.perfilForm.valid) {
      this.isLoading = true;
      this.clienteService.actualizarPerfil(this.perfilForm.value).subscribe({
        next: () => {
          this.alertService.mostrarExito('Perfil actualizado correctamente');
          this.isLoading = false;
        },
        error: (err: any) => {
          this.alertService.mostrarError('Error al actualizar perfil');
          this.isLoading = false;
        },
      });
    }
  }
}
