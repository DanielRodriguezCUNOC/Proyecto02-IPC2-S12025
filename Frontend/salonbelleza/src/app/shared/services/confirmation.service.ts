// confirmation.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  private confirmationSubject = new Subject<{
    message: string;
    callback: (confirmed: boolean) => void;
  }>();

  showConfirmation(message: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.confirmationSubject.next({
        message,
        callback: (confirmed) => resolve(confirmed),
      });
    });
  }

  getConfirmationRequests() {
    return this.confirmationSubject.asObservable();
  }
}
