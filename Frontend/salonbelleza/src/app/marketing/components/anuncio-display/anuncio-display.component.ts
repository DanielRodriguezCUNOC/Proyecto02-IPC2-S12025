import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AnuncioService } from '../../services/anuncio.service';
import { Anuncio } from '../../models/anuncio.model';

@Component({
  selector: 'app-anuncio-display',
  standalone: true,
  templateUrl: './anuncio-display.component.html',
  styleUrls: ['./anuncio-display.component.css'],
})
export class AnuncioDisplayComponent implements OnChanges {
  @Input() interesesUsuario: string[] = [];
  anuncios: Anuncio[] = [];
  loading = true;

  constructor(private anuncioService: AnuncioService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['interesesUsuario']) {
      this.cargarAnunciosRelevantes();
    }
  }

  cargarAnunciosRelevantes(): void {
    this.loading = true;
    this.anuncioService.getAnunciosActivos().subscribe({
      next: (anuncios: any[]) => {
        // Filtrar anuncios por intereses del usuario
        this.anuncios = anuncios.filter(
          (anuncio: { intereses: string | string[] }) =>
            this.interesesUsuario.some((interes) =>
              anuncio.intereses.includes(interes)
            )
        );
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error al cargar anuncios:', err);
        this.loading = false;
      },
    });
  }

  trackByAnuncioId(index: number, anuncio: Anuncio): number {
    return anuncio.id!;
  }
}
