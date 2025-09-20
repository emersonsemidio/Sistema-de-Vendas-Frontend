import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Produto } from '../../models/produto.model';

@Component({
  selector: 'app-quantidade-modal',
  templateUrl: './quantidade-modal.component.html',
  styleUrls: ['./quantidade-modal.component.css']
})
export class QuantidadeModalComponent {
  @Input() produto!: Produto;
  @Input() showModal: boolean = false;
  @Output() fechar = new EventEmitter<void>();

  quantidade: number = 1;

  get maxQuantidade(): number {
    return this.produto?.quantidade || 1;
  }

  aumentarQuantidade(): void {
    if (this.quantidade < this.maxQuantidade) {
      this.quantidade++;
    }
  }

  diminuirQuantidade(): void {
    if (this.quantidade > 1) {
      this.quantidade--;
    }
  }

  fecharModal(): void {
    this.fechar.emit();
    this.quantidade = 1;
  }

  // Impedir que quantidade seja maior que o estoque
  validarQuantidade(): void {
    if (this.quantidade > this.maxQuantidade) {
      this.quantidade = this.maxQuantidade;
    }
    if (this.quantidade < 1) {
      this.quantidade = 1;
    }
  }
}
