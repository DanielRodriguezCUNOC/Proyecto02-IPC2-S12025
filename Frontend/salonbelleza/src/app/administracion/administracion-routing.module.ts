// administracion-routing.module.ts
import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GestionUsuariosComponent } from './components/gestion-usuarios/gestion-usuarios/gestion-usuarios.component';
import { UsuariosListComponent } from './components/gestion-usuarios/usuarios-list/usuarios-list.component';
import { UsuarioFormComponent } from './components/gestion-usuarios/usuario-form/usuario-form.component';
import { UsuarioDetailComponent } from './components/gestion-usuarios/usuario-detail/usuario-detail.component';
import { authGuard } from '../guards/auth.guard';
import { adminGuard } from '../guards/admin.guard';
import { ReporteListComponent } from './components/reportes/reporte-list/reporte-list.component';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [authGuard, adminGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'gestion-usuarios',
        component: GestionUsuariosComponent,
        children: [
          { path: '', component: UsuariosListComponent },
          { path: 'nuevo', component: UsuarioFormComponent },
          { path: ':id/editar', component: UsuarioFormComponent },
          { path: ':id', component: UsuarioDetailComponent },
          { path: 'reportes', component: ReporteListComponent },
        ],
      },
    ],
  },
];
