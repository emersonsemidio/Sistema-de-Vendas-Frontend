import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:8080/cliente';

  constructor(private http: HttpClient) {}

  // cliente.service.ts
getClienteById(clienteId: number | null): Observable<Cliente> {
  if (clienteId === null) {
    throw new Error('Cliente ID não pode ser nulo');
  }
  return this.http.get<Cliente>(`${this.apiUrl}/${clienteId}`);
}

}
