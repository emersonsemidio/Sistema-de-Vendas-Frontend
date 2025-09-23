import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ItemCompra {
  produtoId: number;
  quantidade: number;
}

export interface CompraRequest {
  clienteId: number;
  mercadoId: number;
  total: number;
  formaPagamento: string;
  status: string;
  itens: ItemCompra[];
}

export interface CompraResponse {
  id: number;
  cliente: { id: number };
  mercado: { id: number };
  total: number;
  formaPagamento: string;
  status: string;
  dataCriacao: string;
  itens: ItemCompra[];
}

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  private apiUrl = 'http://localhost:8080/compra'; // Ajuste para sua URL

  constructor(private http: HttpClient) {}

  realizarCompra(compraData: CompraRequest): Observable<CompraResponse> {
    return this.http.post<CompraResponse>(this.apiUrl, compraData);
  }
}
