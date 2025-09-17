import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mercado } from '../models/mercado.model';

@Injectable({
  providedIn: 'root'
})
export class MercadoService {
  private apiUrl = 'http://localhost:8080/mercados';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Mercado[]> {
    return this.http.get<Mercado[]>(this.apiUrl);
  }

  getById(id: number): Observable<Mercado> {
    return this.http.get<Mercado>(`${this.apiUrl}/${id}`);
  }

  create(mercado: Mercado): Observable<Mercado> {
    return this.http.post<Mercado>(this.apiUrl, mercado);
  }

  update(id: number, mercado: Mercado): Observable<Mercado> {
    return this.http.put<Mercado>(`${this.apiUrl}/${id}`, mercado);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
