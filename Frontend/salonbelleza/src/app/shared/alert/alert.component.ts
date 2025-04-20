// alert.component.ts
import { Component, OnInit } from '@angular/core';
import { AlertService, Alert } from '../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  alert: Alert | null = null; // Usa el tipo Alert | null

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertService.alerts$.subscribe((alert: Alert | null) => {
      this.alert = alert;
      if (alert?.duration) {
        setTimeout(() => this.close(), alert.duration);
      }
    });
  }

  close(): void {
    this.alert = null;
    this.alertService.clear();
  }

  get alertClasses(): string {
    if (!this.alert) return '';

    const classes: Record<string, string> = {
      success: 'bg-green-100 border-green-500 text-green-700',
      error: 'bg-red-100 border-red-500 text-red-700',
      info: 'bg-blue-100 border-blue-500 text-blue-700',
      warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
    };

    return classes[this.alert.type] || classes['info'];
  }
}
