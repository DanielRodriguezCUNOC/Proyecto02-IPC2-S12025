#!/bin/bash

# Asegurarse de estar en el proyecto
if [ ! -f "angular.json" ]; then
  echo "❌ No estás dentro del proyecto Angular. Ejecuta esto dentro de 'salon-belleza-frontend'."
  exit 1
fi

# Crear módulos
ng generate module core
ng generate module shared
ng generate module features/auth --module app --route auth
ng generate module features/clientes --module app --route clientes
ng generate module features/empleados --module app --route empleados
ng generate module features/servicios --module app --route servicios
ng generate module features/marketing --module app --route marketing
ng generate module features/administracion --module app --route admin

# Crear componentes comunes
ng generate component core/components/layout/header
ng generate component core/components/layout/footer
ng generate component core/components/layout/sidebar
ng generate component shared/components/ad-banner
ng generate component shared/components/pdf-viewer
ng generate component shared/components/loading-spinner

# Crear servicios
ng generate service core/services/auth
ng generate service core/services/api
ng generate service core/services/ad-service
ng generate service core/services/notification

# Crear guards
ng generate guard core/guards/auth
ng generate guard core/guards/admin
ng generate guard core/guards/empleado
ng generate guard core/guards/marketing

# Crear modelos
mkdir -p src/app/core/models
touch src/app/core/models/usuario.model.ts
touch src/app/core/models/servicio.model.ts
touch src/app/core/models/cita.model.ts
touch src/app/core/models/anuncio.model.ts
touch src/app/core/models/reporte.model.ts

# Configurar rutas principales
cat > src/app/app-routing.module.ts <<EOL
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { EmpleadoGuard } from './core/guards/empleado.guard';
import { MarketingGuard } from './core/guards/marketing.guard';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },
  { path: 'clientes', loadChildren: () => import('./features/clientes/clientes.module').then(m => m.ClientesModule), canActivate: [AuthGuard] },
  { path: 'empleados', loadChildren: () => import('./features/empleados/empleados.module').then(m => m.EmpleadosModule), canActivate: [AuthGuard, EmpleadoGuard] },
  { path: 'servicios', loadChildren: () => import('./features/servicios/servicios.module').then(m => m.ServiciosModule), canActivate: [AuthGuard] },
  { path: 'marketing', loadChildren: () => import('./features/marketing/marketing.module').then(m => m.MarketingModule), canActivate: [AuthGuard, MarketingGuard] },
  { path: 'admin', loadChildren: () => import('./features/administracion/administracion.module').then(m => m.AdministracionModule), canActivate: [AuthGuard, AdminGuard] },
  { path: '', redirectTo: 'servicios', pathMatch: 'full' },
  { path: '**', redirectTo: 'servicios' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
EOL

echo "✅ Estructura del proyecto generada correctamente."
