// interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Recupera o token do localStorage
    const token = localStorage.getItem('authToken');

    console.log('AuthInterceptor - Token encontrado:', token);

    // Se existir token, clona a requisição e adiciona o header Authorization
    if (token) {
      console.log('Adicionando token à requisição:', token);
      const currentHeaders = req.headers ? req.headers : {};
      console.log('Current Headers:', currentHeaders);
      const authReq = req.clone({
        setHeaders: {
          // ...currentHeaders,
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(authReq);
    }

    // Se não tiver token, passa a requisição original
    return next.handle(req);
  }
}
