import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Componentes
import { EmpleadoListComponent } from './components/empleado-list/empleado-list.component';
import { EmpleadoFormComponent } from './components/empleado-form/empleado-form.component';
import { EmpleadoProfileComponent } from './components/empleado-profile/empleado-profile.component';

// Módulos
import { EmpleadosRoutingModule } from './empleados-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    EmpleadoListComponent,
    EmpleadoFormComponent,
    EmpleadoProfileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EmpleadosRoutingModule,
    SharedModule,
  ],
})
export class EmpleadosModule {}
