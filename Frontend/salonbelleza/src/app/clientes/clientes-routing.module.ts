// clientes/clientes-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../guards/auth.guard';

import { PerfilClienteComponent } from './components/perfil-cliente/perfil-cliente.component';
import { HistorialCitasComponent } from './components/historial-citas/historial-citas.component';
import { FacturasComponent } from './components/facturas/facturas.component';
import { ListaNegraComponent } from './components/lista-negra/lista-negra.component';
import { ReservarCitaComponent } from './components/reservar-cita/reservar-cita.component';
import { ClienteActivoGuard } from './guard/cliente-activo.guard';

const routes: Routes = [
  {
    path: 'cliente',
    canActivate: [authGuard],
    children: [
      { path: 'perfil', component: PerfilClienteComponent },
      { path: 'historial', component: HistorialCitasComponent },
      { path: 'facturas', component: FacturasComponent },
      { path: 'lista-negra', component: ListaNegraComponent },
      { path: '', redirectTo: 'perfil', pathMatch: 'full' },
      { path: 'reservar-cita', component: ReservarCitaComponent },
      {
        path: 'reservar',
        component: ReservarCitaComponent,
        canActivate: [ClienteActivoGuard],
      },
      { path: 'historial', component: HistorialCitasComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientesRoutingModule {}
