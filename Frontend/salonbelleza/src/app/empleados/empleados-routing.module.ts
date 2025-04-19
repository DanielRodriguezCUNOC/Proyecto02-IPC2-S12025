import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../guards/auth.guard';
import { Roles } from '../auth/roles.enum';

// Componentes
import { EmpleadoListComponent } from './components/empleado-list/empleado-list.component';
import { EmpleadoFormComponent } from './components/empleado-form/empleado-form.component';
import { EmpleadoProfileComponent } from './components/empleado-profile/empleado-profile.component';

const routes: Routes = [
  {
    path: '',
    component: EmpleadoListComponent,
    canActivate: [authGuard],
    data: { roles: [Roles.ADMIN, Roles.SERVICIOS] },
  },
  {
    path: 'nuevo',
    component: EmpleadoFormComponent,
    canActivate: [authGuard],
    data: { roles: [Roles.ADMIN] },
  },
  {
    path: 'editar/:id',
    component: EmpleadoFormComponent,
    canActivate: [authGuard],
    data: { roles: [Roles.ADMIN] },
  },
  {
    path: 'perfil/:id',
    component: EmpleadoProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpleadosRoutingModule {}
