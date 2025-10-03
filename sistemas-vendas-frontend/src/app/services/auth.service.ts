import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { AuthResponse } from '../models/auth.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private url = 'http://localhost:8080/auth/login'; // Ajuste para sua URL

  constructor(private http: HttpClient) {}

  login(email: string, senha: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.url, { email, senha }).pipe(
      tap(response => {
        console.log('🔑 RESPOSTA COMPLETA DO LOGIN:', response);
        console.log('🔑 TIPO DA RESPOSTA:', typeof response);
        console.log('🔑 PROPRIEDADES:', Object.keys(response));
        console.log('🔑 TOKEN EXTRAÍDO:', response.token);
        // Armazene o token no localStorage ou em outro lugar seguro
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userEmail', response.email);
      })
    );
  }

  logout(): void {
    // Remove o token e dados do usuário
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
