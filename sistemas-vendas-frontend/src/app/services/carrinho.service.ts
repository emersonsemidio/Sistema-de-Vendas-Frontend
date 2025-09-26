// services/carrinho.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Produto } from '../models/produto.model';

export interface ItemCarrinho {
  produto: Produto;
  quantidade: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private carrinhoSubject = new BehaviorSubject<ItemCarrinho[]>([]);
  public carrinho$ = this.carrinhoSubject.asObservable();

  // Adicionar item ao carrinho
  adicionarItem(produto: Produto, quantidade: number): void {
    const carrinhoAtual = this.carrinhoSubject.value;
    const itemExistente = carrinhoAtual.find(item =>
      item.produto.id === produto.id
    );

    if (itemExistente) {
      itemExistente.quantidade += quantidade;
    } else {
      carrinhoAtual.push({ produto, quantidade });
    }

    this.carrinhoSubject.next([...carrinhoAtual]);
    this.salvarNoLocalStorage();
  }

  obterItens(): ItemCarrinho[] {
    return this.carrinhoSubject.value;
  }

  // Remover item
  removerItem(produtoId: number): void {
    const novoCarrinho = this.carrinhoSubject.value.filter(item =>
      item.produto.id !== produtoId
    );
    this.carrinhoSubject.next(novoCarrinho);
    this.salvarNoLocalStorage();
  }

  // Atualizar quantidade
  atualizarQuantidade(produtoId: number, quantidade: number): void {
    const carrinhoAtual = this.carrinhoSubject.value;
    const item = carrinhoAtual.find(item =>
      item.produto.id === produtoId
    );

    if (item) {
      item.quantidade = quantidade;
      this.carrinhoSubject.next([...carrinhoAtual]);
      this.salvarNoLocalStorage();
    }
  }

  // Limpar carrinho
  limparCarrinho(): void {
    this.carrinhoSubject.next([]);
    this.salvarNoLocalStorage();
  }

  // Calcular total
  getTotalCompra(): number {
    return this.carrinhoSubject.value.reduce((total, item) =>
      total + (item.produto.preco * item.quantidade), 0
    );
  }

  // Contar itens
  getTotalItens(): number {
    return this.carrinhoSubject.value.reduce((total, item) => total + item.quantidade, 0);
  }

  // Persistência
  private salvarNoLocalStorage(): void {
    localStorage.setItem('carrinho', JSON.stringify(this.carrinhoSubject.value));
  }

  carregarDoLocalStorage(): void {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
      this.carrinhoSubject.next(JSON.parse(carrinhoSalvo));
    }
  }
}
