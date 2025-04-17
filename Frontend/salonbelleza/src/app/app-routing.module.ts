import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/servicios', pathMatch: 'full' },
  {
    path: 'servicios',
    loadChildren: () =>
      import('./servicios/servicios.module').then((m) => m.ServiciosModule),
  },
  // Agrega más rutas lazy-loaded según necesites (citas, marketing, etc.)
  { path: '**', redirectTo: '/servicios' }, // Ruta comodín para 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
