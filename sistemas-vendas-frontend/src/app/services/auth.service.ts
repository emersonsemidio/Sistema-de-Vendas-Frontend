import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { AuthResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private url = 'http://localhost:8080/auth/login'; // Ajuste para sua URL

  constructor(private http: HttpClient) {}

  login(email: string, senha: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.url, { email, senha });
  }
}
