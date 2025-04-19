import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionUsuariosComponent } from './components/gestion-usuarios/gestion-usuarios/gestion-usuarios.component';
import { UsuariosListComponent } from './components/gestion-usuarios/usuarios-list/usuarios-list.component';
import { UsuarioFormComponent } from './components/gestion-usuarios/usuario-form/usuario-form.component';
import { UsuarioDetailComponent } from './components/gestion-usuarios/usuario-detail/usuario-detail.component';

@NgModule({
  declarations: [
    GestionUsuariosComponent,
    UsuariosListComponent,
    UsuarioFormComponent,
    UsuarioDetailComponent,
  ],
  imports: [CommonModule],
})
export class AdministracionModule {}
