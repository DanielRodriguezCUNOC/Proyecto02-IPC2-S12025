// register.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup | undefined; // Solo declaramos el tipo aquí
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      telefono: [''],
      dpi: [''],
    });
  }

  onSubmit(): void {
    if (this.registerForm!.valid && this.passwordsMatch()) {
      this.loading = true;
      const { confirmPassword, ...userData } = this.registerForm!.value;

      this.authService.register(userData).subscribe({
        next: () => {
          this.alertService.mostrarExito(
            'Registro exitoso. Por favor inicia sesión.'
          );
          this.router.navigate(['/login']);
        },
        error: (error: { error: { message: any } }) => {
          this.alertService.mostrarError(
            error.error?.message || 'Error al registrarse'
          );
          this.loading = false;
        },
      });
    }
  }

  passwordsMatch(): boolean {
    const { password, confirmPassword } = this.registerForm?.value || {};
    if (password !== confirmPassword) {
      this.alertService.mostrarError('Las contraseñas no coinciden');
      return false;
    }
    return true;
  }
}
