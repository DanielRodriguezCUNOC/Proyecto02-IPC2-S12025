// usuario-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { AlertService } from '../../../../shared/services/alert.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css'],
})
export class UsuarioFormComponent implements OnInit {
  usuarioForm: FormGroup;
  isEditMode = false;
  isLoading = false;
  roles: string[] = [];
  userId?: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
    private alertService: AlertService
  ) {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      rol: ['', Validators.required],
      // Campos específicos por rol
      especialidad: [''],
      dpi: [''],
    });
  }

  ngOnInit(): void {
    this.usuarioService
      .getRoles()
      .subscribe((roles: string[]) => (this.roles = roles));

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.userId = +params['id'];
        this.cargarUsuario(this.userId);
      }
    });
  }

  cargarUsuario(id: number): void {
    this.isLoading = true;
    this.usuarioService.getUsuario(id).subscribe({
      next: (usuario: { [key: string]: any }) => {
        this.usuarioForm.patchValue(usuario);
        this.isLoading = false;
      },
      error: (err: any) => {
        this.alertService.mostrarError('Error al cargar usuario');
        this.isLoading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.usuarioForm.valid) {
      this.isLoading = true;
      const usuarioData = this.usuarioForm.value;

      const operation = this.isEditMode
        ? this.usuarioService.actualizarUsuario(this.userId!, usuarioData)
        : this.usuarioService.crearUsuario(usuarioData);

      operation.subscribe({
        next: () => {
          this.alertService.mostrarExito(
            `Usuario ${
              this.isEditMode ? 'actualizado' : 'creado'
            } correctamente`
          );
          this.router.navigate(['/admin/gestion-usuarios']);
        },
        error: (err: any) => {
          this.alertService.mostrarError('Error al guardar usuario');
          this.isLoading = false;
        },
      });
    }
  }

  onRolChange(): void {
    // Puedes añadir lógica para mostrar/ocultar campos según el rol
  }
}
