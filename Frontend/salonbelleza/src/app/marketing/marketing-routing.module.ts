import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../auth/auth.guard';
import { Roles } from '../auth/roles.enum';

// Componentes
import { AnuncioListComponent } from './components/anuncio-list/anuncio-list.component';
import { AnuncioFormComponent } from './components/anuncio-form/anuncio-form.component';
import { ReportesComponent } from './pages/reportes/reportes.component';

const routes: Routes = [
  {
    path: '',
    component: AnuncioListComponent,
    canActivate: [authGuard],
    data: { roles: [Roles.MARKETING, Roles.ADMIN] },
  },
  {
    path: 'nuevo',
    component: AnuncioFormComponent,
    canActivate: [authGuard],
    data: { roles: [Roles.MARKETING] },
  },
  {
    path: 'editar/:id',
    component: AnuncioFormComponent,
    canActivate: [authGuard],
    data: { roles: [Roles.MARKETING] },
  },
  {
    path: 'reportes',
    component: ReportesComponent,
    canActivate: [authGuard],
    data: { roles: [Roles.MARKETING, Roles.ADMIN] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketingRoutingModule {}
