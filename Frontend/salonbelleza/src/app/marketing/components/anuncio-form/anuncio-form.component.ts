import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnuncioService, Anuncio } from '../../services/anuncio.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-anuncio-form',
  templateUrl: './anuncio-form.component.html',
  styleUrls: ['./anuncio-form.component.css'],
})
export class AnuncioFormComponent implements OnInit {
  anuncioForm: FormGroup;
  isEditMode = false;
  anuncioId?: number;
  tiposAnuncio = ['texto', 'imagen', 'video'];
  intereses = [
    'cuidado_cabello',
    'maquillaje',
    'unas',
    'piel',
    'hombre',
    'mujer',
    'unisex',
  ];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private anuncioService: AnuncioService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.anuncioForm = this.fb.group({
      titulo: ['', Validators.required],
      tipo: ['texto', Validators.required],
      contenido: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      diasVigencia: ['', [Validators.required, Validators.min(1)]],
      intereses: [[], Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.anuncioId = +params['id'];
        this.cargarAnuncio(this.anuncioId);
      }
    });
  }

  cargarAnuncio(id: number): void {
    this.anuncioService.getAnuncio(id).subscribe({
      next: (anuncio: Anuncio) => {
        this.anuncioForm.patchValue({
          ...anuncio,
          fechaInicio: anuncio.fechaInicio.split('T')[0],
        });
      },
      error: (err: any) => console.error('Error al cargar anuncio:', err),
    });
  }

  onSubmit(): void {
    if (this.anuncioForm.valid) {
      this.loading = true;
      const formValue = this.anuncioForm.value;
      const usuarioId = this.authService.getUsuarioId();

      const anuncioData: Partial<Anuncio> = {
        ...formValue,
        creadoPor: usuarioId,
        fechaFin: this.calcularFechaFin(
          formValue.fechaInicio,
          formValue.diasVigencia
        ),
        estado: 'activo',
      };

      if (this.isEditMode && this.anuncioId) {
        this.anuncioService
          .actualizarAnuncio(this.anuncioId, anuncioData)
          .subscribe({
            next: () => {
              this.loading = false;
              this.router.navigate(['/marketing']);
            },
            error: (err: any) => {
              console.error('Error al actualizar:', err);
              this.loading = false;
            },
          });
      } else {
        this.anuncioService
          .crearAnuncio(anuncioData as Omit<Anuncio, 'id'>)
          .subscribe({
            next: () => {
              this.loading = false;
              this.router.navigate(['/marketing']);
            },
            error: (err: any) => {
              console.error('Error al crear:', err);
              this.loading = false;
            },
          });
      }
    }
  }

  calcularFechaFin(fechaInicio: string, diasVigencia: number): string {
    const fecha = new Date(fechaInicio);
    fecha.setDate(fecha.getDate() + diasVigencia);
    return fecha.toISOString().split('T')[0];
  }

  onTipoChange(): void {
    const tipo = this.anuncioForm.get('tipo')?.value;
    const contenidoControl = this.anuncioForm.get('contenido');

    if (tipo === 'texto') {
      contenidoControl?.setValue('');
      contenidoControl?.setValidators([
        Validators.required,
        Validators.maxLength(500),
      ]);
    } else {
      contenidoControl?.setValue('');
      contenidoControl?.setValidators([Validators.required]);
    }

    contenidoControl?.updateValueAndValidity();
  }
}
