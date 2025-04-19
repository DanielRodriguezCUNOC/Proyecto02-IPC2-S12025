// src/app/shared/alert.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Alert {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertSubject = new BehaviorSubject<Alert | null>(null);
  public alerts$ = this.alertSubject.asObservable();

  mostrarExito(message: string, duration: number = 5000): void {
    this.alertSubject.next({ type: 'success', message, duration });
  }

  mostrarError(message: string, duration: number = 5000): void {
    this.alertSubject.next({ type: 'error', message, duration });
  }

  mostrarInfo(message: string, duration: number = 5000): void {
    this.alertSubject.next({ type: 'info', message, duration });
  }

  mostrarWarning(message: string, duration: number = 5000): void {
    this.alertSubject.next({ type: 'warning', message, duration });
  }

  clear(): void {
    this.alertSubject.next(null);
  }

  private setAutoHide(duration: number): void {
    if (duration > 0) {
      setTimeout(() => this.clear(), duration);
    }
  }
}
