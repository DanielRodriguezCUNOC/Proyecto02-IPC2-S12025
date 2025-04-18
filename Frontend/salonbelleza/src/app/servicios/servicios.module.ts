import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Componentes
import { ServicioListComponent } from './components/servicio-list/servicio-list.component';
import { ServicioFormComponent } from './components/servicio-form/servicio-form.component';

// Módulos
import { ServiciosRoutingModule } from './servicios-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ServicioCardComponent } from './components/servicio-card/servicio-card.component';
import { ServicioDetailComponent } from './components/servicio-detail/servicio-detail.component';
import { ServicioListClientComponent } from './components/servicio-list-client/servicio-list-client.component';

@NgModule({
  declarations: [
    ServicioListComponent,
    ServicioFormComponent,
    ServicioDetailComponent,
    ServicioCardComponent,
    ServicioListClientComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, // Necesario para subida de archivos
    ServiciosRoutingModule,
    SharedModule,
  ],
  exports: [
    ServicioCardComponent, // Para usarlo en otros módulos
    ServicioListClientComponent,
  ],
})
export class ServiciosModule {}
