// loading-spinner.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: `
    <div class="flex justify-center items-center">
      <div
        class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"
      ></div>
    </div>
  `,
  styleUrls: ['./loading-spinner.component.css'],
})
export class LoadingSpinnerComponent {}
