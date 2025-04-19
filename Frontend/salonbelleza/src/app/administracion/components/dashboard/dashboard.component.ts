// dashboard.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Chart, registerables } from 'chart.js';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  stats: any = {};
  loading = true;
  chart: any;
  private refreshSubscription!: Subscription;
  private readonly REFRESH_INTERVAL = 300000;
  fechaInicio: Date = new Date(new Date().setDate(new Date().getDate() - 30));
  fechaFin: Date = new Date();
  ultimaActualizacion: Date | null = null;

  constructor(private dashboardService: DashboardService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadData();
    this.setupAutoRefresh();
  }

  ngOnDestroy(): void {
    this.refreshSubscription?.unsubscribe();
  }

  setupAutoRefresh(): void {
    this.refreshSubscription = timer(
      this.REFRESH_INTERVAL,
      this.REFRESH_INTERVAL
    ).subscribe(() => this.loadData());
  }

  actualizarFiltros(): void {
    this.loadData();
  }

  loadData(): void {
    const params = {
      fechaInicio: this.fechaInicio.toISOString().split('T')[0],
      fechaFin: this.fechaFin.toISOString().split('T')[0],
    };

    this.dashboardService.getDashboardData(params).subscribe({
      next: (data) => {
        this.ultimaActualizacion = new Date();
      },
    });
  }

  initCharts(): void {
    // Gráfico de citas por estado
    this.chart = new Chart('citasChart', {
      type: 'doughnut',
      data: {
        labels: ['Completadas', 'Pendientes', 'Canceladas'],
        datasets: [
          {
            data: [
              this.stats.citasCompletadas,
              this.stats.citasPendientes,
              this.stats.citasCanceladas,
            ],
            backgroundColor: ['#10B981', '#FBBF24', '#EF4444'],
          },
        ],
      },
    });

    // Gráfico de ingresos (ejemplo adicional)
    new Chart('ingresosChart', {
      type: 'bar',
      data: {
        labels: ['Últimos 7 días'],
        datasets: [
          {
            label: 'Servicios',
            data: [this.stats.ingresosServicios],
            backgroundColor: '#3B82F6',
          },
          {
            label: 'Anuncios',
            data: [this.stats.ingresosAnuncios],
            backgroundColor: '#8B5CF6',
          },
        ],
      },
    });
  }
}
