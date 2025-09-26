import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Produto } from '../../models/produto.model';
import {
  CompraService,
  CompraRequest,
  CompraResponse,
} from '../../services/compra.service';
import { CarrinhoService } from 'src/app/services/carrinho.service';

@Component({
  selector: 'app-quantidade-modal',
  templateUrl: './quantidade-modal.component.html',
  styleUrls: ['./quantidade-modal.component.css'],
})
export class QuantidadeModalComponent {
  @Input() produto!: Produto;
  @Input() showModal: boolean = false;
  @Input() cliente!: any;
  @Input() mercadoId!: number;
  @Input() modoCarrinho: boolean = false; // NOVO: Define se é para carrinho

  @Output() confirmar = new EventEmitter<{
    produto: Produto;
    quantidade: number;
  }>();
  @Output() adicionarAoCarrinho = new EventEmitter<{
    produto: Produto;
    quantidade: number;
  }>(); // NOVO
  @Output() fechar = new EventEmitter<void>();

  quantidade: number = 1;
  loading: boolean = false;
  mensagem: string = '';
  sucesso: boolean = false;

  constructor(
    private compraService: CompraService,
    private carrinhoService: CarrinhoService
  ) {}

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
    console.log('Confirmar compra chamado');
    this.loading = true;
    this.mensagem = '';

      if (!this.cliente || !this.cliente.id) {
        throw new Error('Cliente não selecionado');
      }

      if (!this.produto || !this.produto.id) {
        throw new Error('Produto não selecionado');
      }


        console.log('Adicionando ao carrinho:')
        // NOVO: Modo carrinho - apenas adiciona ao carrinho
        this.adicionarAoCarrinho.emit({
          produto: this.produto,
          quantidade: this.quantidade,
        });

        this.carrinhoService.adicionarItem(this.produto, this.quantidade);

        this.mostrarMensagem('Produto adicionado ao carrinho!', true);

        setTimeout(() => {
          this.fecharModal();
        }, 1500);

        this.loading = false;

        // Modo compra direta (existente)





  }

  // confirmarCompraCarrinho(): void {

  //   const compraData: CompraRequest = {
  //     clienteId: this.cliente.id,
  //     mercadoId: this.mercadoId,
  //     total: this.calcularTotal(),
  //     formaPagamento: 'PIX',
  //     status: 'PENDENTE',
  //     itens: this.carrinhoService
  //       .obterItens()
  //       .map((item) => {
  //         console.log(item);
  //         return {
  //           produtoId: item.produto.id,
  //           quantidade: item.quantidade,
  //         };
  //       }),
  //   };

  //     this.compraService.realizarCompra(compraData).subscribe({
  //       next: (compraResponse) => {
  //         this.confirmar.emit({
  //           produto: this.produto,
  //           quantidade: this.quantidade
  //         });

  //         this.mostrarMensagem('Compra realizada com sucesso!', true);

  //         setTimeout(() => {
  //           this.fecharModal();
  //         }, 2000);
  //       },
  //       error: (error) => {
  //         this.mostrarMensagem(
  //           error.error?.message || error.message || 'Erro ao realizar compra',
  //           false
  //         );
  //         this.loading = false;
  //       }
  //     })

  // }

  calcularTotal(): number {
    return this.produto ? this.produto.preco * this.quantidade : 0;
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
