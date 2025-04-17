import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Componentes
import { CitaListComponent } from './components/cita-list/cita-list.component';
import { CitaFormComponent } from './components/cita-form/cita-form.component';
import { CitaDetailComponent } from './components/cita-detail/cita-detail.component';
import { CalendarioDisponibilidadComponent } from './components/calendario-disponibilidad/calendario-disponibilidad.component';
import { MisCitasComponent } from './pages/mis-citas/mis-citas.component';
import { ConfirmacionCitaComponent } from './components/confirmacion-cita/confirmacion-cita.component';

// Módulos
import { CitasRoutingModule } from './citas-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CitaListComponent,
    CitaFormComponent,
    CitaDetailComponent,
    CalendarioDisponibilidadComponent,
    MisCitasComponent,
    ConfirmacionCitaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CitasRoutingModule,
    SharedModule,
  ],
})
export class CitasModule {}
