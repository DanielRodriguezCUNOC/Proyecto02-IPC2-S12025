import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ServicioService,
  Servicio,
  Catalogo,
} from '../../services/servicio.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-servicio-form',
  templateUrl: './servicio-form.component.html',
  styleUrls: ['./servicio-form.component.css'],
})
export class ServicioFormComponent implements OnInit {
  servicioForm: FormGroup;
  isEditMode = false;
  servicioId?: number;
  loading = false;
  catalogos: Catalogo[] = [];
  archivoParaSubir?: File;
  categorias = [
    'corte',
    'color',
    'tratamiento',
    'manicura',
    'pedicura',
    'otros',
  ];

  constructor(
    private fb: FormBuilder,
    private servicioService: ServicioService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.servicioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.maxLength(500)]],
      duracion: [
        '',
        [Validators.required, Validators.min(5), Validators.max(300)],
      ],
      precio: ['', [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required],
      imagenUrl: [''],
      estado: ['activo', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params) => {
          if (params['id']) {
            this.isEditMode = true;
            this.servicioId = +params['id'];
            return this.servicioService.getServicio(this.servicioId);
          }
          return of(null);
        })
      )
      .subscribe((servicio) => {
        if (servicio) {
          this.servicioForm.patchValue(servicio);
          this.catalogos = servicio.catalogos || [];
        }
      });
  }

  onSubmit(): void {
    if (this.servicioForm.valid) {
      this.loading = true;
      const servicioData = this.servicioForm.value;

      if (this.isEditMode && this.servicioId) {
        this.servicioService
          .actualizarServicio(this.servicioId, servicioData)
          .subscribe({
            next: () => this.router.navigate(['/servicios']),
            error: (err) => {
              console.error('Error al actualizar:', err);
              this.loading = false;
            },
          });
      } else {
        this.servicioService.crearServicio(servicioData).subscribe({
          next: (servicio) => {
            this.router.navigate(['/servicios/editar', servicio.id]);
          },
          error: (err) => {
            console.error('Error al crear:', err);
            this.loading = false;
          },
        });
      }
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.archivoParaSubir = file;
    }
  }

  agregarCatalogo(): void {
    if (this.servicioId && this.archivoParaSubir) {
      this.loading = true;
      const nombreCatalogo = prompt('Ingrese el nombre del catálogo:');

      if (nombreCatalogo) {
        this.servicioService
          .subirArchivoCatalogo(this.servicioId, this.archivoParaSubir)
          .pipe(
            switchMap((response) => {
              const nuevoCatalogo: Omit<Catalogo, 'id'> = {
                nombre: nombreCatalogo,
                descripcion: `Catálogo de ${this.servicioForm.value.nombre}`,
                archivoUrl: response.url,
                servicioId: this.servicioId!,
              };
              return this.servicioService.agregarCatalogo(
                this.servicioId!,
                nuevoCatalogo
              );
            })
          )
          .subscribe({
            next: (catalogo) => {
              this.catalogos.push(catalogo);
              this.archivoParaSubir = undefined;
              this.loading = false;
            },
            error: (err) => {
              console.error('Error al subir catálogo:', err);
              this.loading = false;
            },
          });
      }
    }
  }

  eliminarCatalogo(catalogoId: number): void {
    if (confirm('¿Está seguro de eliminar este catálogo?') && this.servicioId) {
      this.servicioService
        .eliminarCatalogo(this.servicioId, catalogoId)
        .subscribe({
          next: () => {
            this.catalogos = this.catalogos.filter((c) => c.id !== catalogoId);
          },
          error: (err) => console.error('Error al eliminar:', err),
        });
    }
  }
}
