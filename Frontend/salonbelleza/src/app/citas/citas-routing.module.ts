import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../guards/auth.guard';
import { Roles } from '../auth/roles.enum';

// Componentes
import { CitaListComponent } from './components/cita-list/cita-list.component';
import { CitaFormComponent } from './components/cita-form/cita-form.component';
import { CitaDetailComponent } from './components/cita-detail/cita-detail.component';
import { CalendarioDisponibilidadComponent } from './components/calendario-disponibilidad/calendario-disponibilidad.component';
import { MisCitasComponent } from './pages/mis-citas/mis-citas.component';
import { ConfirmacionCitaComponent } from './components/confirmacion-cita/confirmacion-cita.component';

const routes: Routes = [
  {
    path: '',
    component: CitaListComponent,
    canActivate: [authGuard],
    data: { roles: [Roles.ADMIN, Roles.EMPLEADO] },
  },
  {
    path: 'mis-citas',
    component: MisCitasComponent,
    canActivate: [authGuard],
    data: { roles: [Roles.CLIENTE, Roles.EMPLEADO] },
  },
  {
    path: 'nueva',
    component: CitaFormComponent,
    canActivate: [authGuard],
    data: { roles: [Roles.CLIENTE] },
  },
  {
    path: 'editar/:id',
    component: CitaFormComponent,
    canActivate: [authGuard],
    data: { roles: [Roles.CLIENTE, Roles.ADMIN] },
  },
  {
    path: 'detalle/:id',
    component: CitaDetailComponent,
    canActivate: [authGuard],
  },
  {
    path: 'disponibilidad',
    component: CalendarioDisponibilidadComponent,
    canActivate: [authGuard],
    data: { roles: [Roles.EMPLEADO] },
  },
  {
    path: 'confirmacion/:id',
    component: ConfirmacionCitaComponent,
    canActivate: [authGuard],
    data: { roles: [Roles.CLIENTE] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitasRoutingModule {}
