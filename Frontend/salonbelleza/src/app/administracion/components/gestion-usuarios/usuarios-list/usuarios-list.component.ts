// usuarios-list.component.ts
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../../models/usuario.model';
import { AlertService } from '../../../../shared/services/alert.service';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css'],
})
export class UsuariosListComponent implements OnInit {
  usuarios: Usuario[] = [];
  filteredUsuarios: Usuario[] = [];
  isLoading = true;
  searchTerm = '';
  currentRoleFilter = '';

  constructor(
    private usuarioService: UsuarioService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.isLoading = true;
    this.usuarioService.getUsuarios().subscribe({
      next: (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        this.filteredUsuarios = [...usuarios];
        this.isLoading = false;
      },
      error: (err: any) => {
        this.alertService.mostrarError('Error al cargar usuarios');
        this.isLoading = false;
      },
    });
  }

  filtrarUsuarios(): void {
    this.filteredUsuarios = this.usuarios.filter((usuario) => {
      const matchesSearch =
        usuario.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        usuario.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesRole = this.currentRoleFilter
        ? usuario.rol === this.currentRoleFilter
        : true;
      return matchesSearch && matchesRole;
    });
  }

  cambiarEstadoUsuario(id: number, estado: 'activo' | 'inactivo'): void {
    this.usuarioService.cambiarEstadoUsuario(id, estado).subscribe({
      next: () => {
        this.alertService.mostrarExito('Estado actualizado correctamente');
        this.cargarUsuarios();
      },
      error: (err: any) => {
        this.alertService.mostrarError('Error al cambiar estado');
      },
    });
  }
}
