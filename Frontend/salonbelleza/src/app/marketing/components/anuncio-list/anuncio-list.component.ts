import { Component, OnInit } from '@angular/core';
import { AnuncioService, Anuncio } from '../../services/anuncio.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anuncio-list',
  templateUrl: './anuncio-list.component.html',
  styleUrls: ['./anuncio-list.component.css'],
})
export class AnuncioListComponent implements OnInit {
  anuncios: Anuncio[] = [];
  loading = true;
  filtroEstado = 'todos';

  constructor(
    private anuncioService: AnuncioService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarAnuncios();
  }

  cargarAnuncios(): void {
    this.loading = true;
    this.anuncioService.getAnuncios().subscribe({
      next: (anuncios: Anuncio[]) => {
        this.anuncios = anuncios;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error al cargar anuncios:', err);
        this.loading = false;
      },
    });
  }

  cambiarEstado(id: number, estado: 'activo' | 'inactivo'): void {
    this.anuncioService.cambiarEstadoAnuncio(id, estado).subscribe({
      next: () => {
        this.anuncios = this.anuncios.map((a) =>
          a.id === id ? { ...a, estado } : a
        );
      },
      error: (err: any) => console.error('Error al cambiar estado:', err),
    });
  }

  filtrarAnuncios(): Anuncio[] {
    if (this.filtroEstado === 'todos') {
      return this.anuncios;
    }
    return this.anuncios.filter((a) => a.estado === this.filtroEstado);
  }

  editarAnuncio(id: number): void {
    this.router.navigate(['/marketing/editar', id]);
  }

  getBadgeClass(estado: string): string {
    switch (estado) {
      case 'activo':
        return 'badge-success';
      case 'inactivo':
        return 'badge-error';
      case 'pendiente':
        return 'badge-warning';
      default:
        return 'badge-info';
    }
  }
}
