import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Componentes
import { AnuncioListComponent } from './components/anuncio-list/anuncio-list.component';
import { AnuncioFormComponent } from './components/anuncio-form/anuncio-form.component';
import { AnuncioDisplayComponent } from './components/anuncio-display/anuncio-display.component';
import { ReportesComponent } from './pages/reportes/reportes.component';

// Módulos
import { MarketingRoutingModule } from './marketing-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AnuncioListComponent,
    AnuncioFormComponent,
    AnuncioDisplayComponent,
    ReportesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MarketingRoutingModule,
    SharedModule,
  ],
})
export class MarketingModule {}
