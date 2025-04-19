// modal.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  template: `
    <div
      *ngIf="visible"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div class="p-4 border-b flex justify-between items-center">
          <h3 class="text-lg font-medium">{{ title }}</h3>
          <button
            (click)="close.emit()"
            class="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <div class="p-4">
          <ng-content></ng-content>
        </div>
        <div class="p-4 border-t flex justify-end space-x-2">
          <button
            *ngIf="showCancel"
            (click)="close.emit()"
            class="px-4 py-2 bg-gray-200 rounded-md"
          >
            Cancelar
          </button>
          <button
            (click)="confirm.emit()"
            class="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ModalComponent {
  @Input() title: string = '';
  @Input() visible: boolean = false;
  @Input() confirmText: string = 'Aceptar';
  @Input() showCancel: boolean = true;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();
}
