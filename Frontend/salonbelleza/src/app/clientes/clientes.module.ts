// clientes/clientes.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ClientesRoutingModule } from './clientes-routing.module';
import { SharedModule } from '../shared/shared.module';

import { HistorialCitasComponent } from './components/historial-citas/historial-citas.component';
import { FacturasComponent } from './components/facturas/facturas.component';
import { ListaNegraComponent } from './components/lista-negra/lista-negra.component';
import { PerfilClienteComponent } from './components/perfil-cliente/perfil-cliente.component';
import { ReservarCitaComponent } from './components/reservar-cita/reservar-cita.component';
import { MarketingModule } from '../marketing/marketing.module';

@NgModule({
  declarations: [
    HistorialCitasComponent,
    FacturasComponent,
    ListaNegraComponent,
    PerfilClienteComponent,
    ReservarCitaComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    ClientesRoutingModule,
    MarketingModule,
  ],
})
export class ClientesModule {}
