// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from '../shared/services/alert.service';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [AlertComponent, LoadingSpinnerComponent, ModalComponent],
  imports: [CommonModule],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    ModalComponent,
    CommonModule,
  ],
  providers: [],
})
export class SharedModule {}
