// src/app/components/registro-cliente/registro-cliente.component.ts
import { Component } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css'],
})
export class RegistroClienteComponent {
  cliente: Cliente = {
    email: '',
    contrasena: '',
    confirmarContrasena: '',
    dpi: '',
    nombres: '',
    apellidos: '',
    telefono: '',
    direccion: '',
    intereses: '',
  };

  mensajeError: string = '';
  mensajeExito: string = '';

  constructor(private clienteService: ClienteService, private router: Router) {}

  onSubmit(): void {
    this.mensajeError = '';
    this.mensajeExito = '';

    // Validación básica
    if (this.cliente.contrasena !== this.cliente.confirmarContrasena) {
      this.mensajeError = 'Las contraseñas no coinciden';
      return;
    }

    // Eliminar confirmarContrasena antes de enviar
    const { confirmarContrasena, ...clienteData } = this.cliente;

    this.clienteService.registrarCliente(clienteData).subscribe({
      next: (response: any) => {
        this.mensajeExito = 'Registro exitoso! Redirigiendo...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err: { error: { mensaje: string } }) => {
        this.mensajeError = err.error?.mensaje || 'Error en el registro';
      },
    });
  }
}
