import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Produto } from '../../models/produto.model';
import { CompraService, CompraRequest, CompraResponse } from '../../services/compra.service';

@Component({
  selector: 'app-quantidade-modal',
  templateUrl: './quantidade-modal.component.html',
  styleUrls: ['./quantidade-modal.component.css']
})
export class QuantidadeModalComponent {
  @Input() produto!: Produto;
  @Input() showModal: boolean = false;
  @Input() cliente!: any;

  @Input() mercadoId!: number;

  @Output() confirmar = new EventEmitter<{produto: Produto, quantidade: number, compraResponse?: CompraResponse}>();
  @Output() fechar = new EventEmitter<void>();

  quantidade: number = 1;
  loading: boolean = false;
  mensagem: string = '';
  sucesso: boolean = false;

  constructor(private compraService: CompraService) {}

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

  async confirmarCompra(): Promise<void> {
    this.loading = true;
    this.mensagem = '';

    try {
      // Validações
      if (!this.cliente || !this.cliente.id) {
        throw new Error('Cliente não selecionado');
      }

      if (!this.produto || !this.produto.id) {
        throw new Error('Produto não selecionado');
      }

      // Preparar dados da compra
      const compraData: CompraRequest = {
        clienteId: this.cliente.id,
        mercadoId: this.mercadoId,
        total: this.calcularTotal(),
        formaPagamento: 'PIX',
        status: 'PENDENTE',
        itens: [
          {
            produtoId: this.produto.id,
            quantidade: this.quantidade
          }
        ]
      };
      console.log('Dados da compra:', compraData);

      // Chamar o serviço de compra
      // const compraResponse = await this.compraService.realizarCompra(compraData).toPromise();
      this.compraService.realizarCompra(compraData).subscribe({
        next: (compraResponse) => {
          console.log('Compra realizada com sucesso:', compraResponse);
          // Emitir sucesso para o componente pai
          this.confirmar.emit({
            produto: this.produto,
            quantidade: this.quantidade,
            compraResponse: compraResponse
          });

          this.mostrarMensagem('Compra realizada com sucesso!', true);

          // Fechar modal após 2 segundos
          setTimeout(() => {
            this.fecharModal();
          }, 2000);
        },
        error: (error) => {
          console.error('Erro ao confirmar compra:', error);
          this.mostrarMensagem(
            error.error?.message || error.message || 'Erro ao realizar compra',
            false
          );
          this.loading = false;
        }
      });

    } catch (error: any) {
      console.error('Erro ao confirmar compra:', error);
      this.mostrarMensagem(
        error.error?.message || error.message || 'Erro ao realizar compra',
        false
      );
    } finally {
      this.loading = false;
    }
  }

  calcularTotal(): number {
    return this.produto ? this.produto.preco * this.quantidade : 0;
  }

  calcularTotal2(acumulado: number): number {
    return this.produto ? this.produto.preco * this.quantidade : 0 + acumulado;
  }

  private mostrarMensagem(msg: string, sucesso: boolean) {
    this.mensagem = msg;
    this.sucesso = sucesso;
  }

  fecharModal(): void {
    this.fechar.emit();
    this.quantidade = 1;
    this.mensagem = '';
  }

  validarQuantidade(): void {
    if (this.quantidade > this.maxQuantidade) {
      this.quantidade = this.maxQuantidade;
    }
    if (this.quantidade < 1) {
      this.quantidade = 1;
    }
  }
}
