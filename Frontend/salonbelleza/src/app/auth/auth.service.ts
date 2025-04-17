import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  getUsuarioId(): number | null {
    const id = localStorage.getItem('usuarioId');
    return id ? +id : null;
  }
  tieneRol(rol: string): boolean {
    const roles = localStorage.getItem('roles');
    return roles ? roles.split(',').includes(rol) : false;
  }
}
