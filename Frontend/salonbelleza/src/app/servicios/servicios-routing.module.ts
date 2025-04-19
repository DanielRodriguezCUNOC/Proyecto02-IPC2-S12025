import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../guards/auth.guard';
import { Roles } from '../auth/roles.enum';

// Componentes
import { ServicioListComponent } from './components/servicio-list/servicio-list.component';
import { ServicioFormComponent } from './components/servicio-form/servicio-form.component';
import { ServicioDetailComponent } from './components/servicio-detail/servicio-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ServicioListComponent,
    canActivate: [authGuard],
    data: { roles: [Roles.ADMIN, Roles.SERVICIOS] },
  },
  {
    path: 'nuevo',
    component: ServicioFormComponent,
    canActivate: [authGuard],
    data: { roles: [Roles.SERVICIOS] },
  },
  {
    path: 'editar/:id',
    component: ServicioFormComponent,
    canActivate: [authGuard],
    data: { roles: [Roles.SERVICIOS] },
  },
  {
    path: ':id',
    component: ServicioDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiciosRoutingModule {}
