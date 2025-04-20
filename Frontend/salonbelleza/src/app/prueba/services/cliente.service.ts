// src/app/services/cliente.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = 'http://localhost:8080/tu-app/registrar';

  constructor(private http: HttpClient) {}

  registrarCliente(clienteData: any): Observable<any> {
    return this.http.post(this.apiUrl, clienteData);
  }
}
