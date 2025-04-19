// cliente-activo.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClienteService } from '../services/cliente.service';

@Injectable({
  providedIn: 'root',
})
export class ClienteActivoGuard implements CanActivate {
  constructor(private clienteService: ClienteService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.clienteService.verificarListaNegra().pipe(
      map((data) => {
        if (data.enLista) {
          this.router.navigate(['/cliente/lista-negra']);
          return false;
        }
        return true;
      })
    );
  }
}
