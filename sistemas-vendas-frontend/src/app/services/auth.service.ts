import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { AuthResponse } from '../models/auth.model';
import { tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  isLoggedInObs = this.isLoggedIn$.asObservable();

  private url = 'http://localhost:8080/auth'; // Ajuste para sua URL

  constructor(private http: HttpClient) {
    this.start();
  }

  login(email: string, senha: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.url}/login`, { email, senha }).pipe(
      tap(response => {
        console.log('🔑 RESPOSTA COMPLETA DO LOGIN:', response);
        console.log('🔑 TIPO DA RESPOSTA:', typeof response);
        console.log('🔑 PROPRIEDADES:', Object.keys(response));
        console.log('🔑 TOKEN EXTRAÍDO:', response.token);
        // Armazene o token no localStorage ou em outro lugar seguro
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userEmail', response.email);
        this.isLoggedIn$.next(true);
      })
    );
  }

  start() {
    this.isLoggedIn$.next(this.isLoggedIn());
  }

getCurrentUser() {
  const token = this.getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('🔐 Payload do Token:', payload);

    // Extrai email e nome baseado em claims padrão
    return {
      name: payload.name || payload.sub || 'Usuário',
      email: payload.email || payload.sub, // sub geralmente é o email em alguns sistemas
      // Outros campos que podem estar disponíveis
    };
  } catch (error) {
    console.error('Erro ao decodificar token:', error);
    return null;
  }
}

  cadastrarCliente(cliente: any): Observable<any> {
    return this.http.post<any>(`${this.url}/register`, cliente);
  }

  getClienteId(): number | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      // Decodifica o token JWT (parte do payload)
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('🔐 Payload do Token:', payload);

      // O ID do cliente pode vir em diferentes campos:
      return payload.id || payload.userId || payload.clienteId || null;
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
      return null;
    }
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
