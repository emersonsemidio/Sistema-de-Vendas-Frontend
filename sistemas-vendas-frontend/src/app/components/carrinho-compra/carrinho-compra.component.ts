import { AuthService } from './../../services/auth.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CarrinhoService, ItemCarrinho } from '../../services/carrinho.service';
import { CompraRequest, CompraService } from '../../services/compra.service';
import { Produto } from 'src/app/models/produto.model';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho-compra.component.html',
  styleUrls: ['./carrinho-compra.component.css']
})
export class CarrinhoComponent implements OnInit {
  carrinho: any = null;
  loading: boolean = false;
  @Input() showModal: boolean = false;
  @Input() produto!: Produto;

  @Input() mercadoId!: number;

  @Input() cliente !: any;

  quantidade: number = 1;

  @Output() fechar = new EventEmitter<void>();

  @Output() confirmar = new EventEmitter<{
    produto: Produto;
    quantidade: number;
  }>();

  mensagem: string = '';

  sucesso: boolean = false;

  // Cliente fixo para testes

  constructor(
    public carrinhoService: CarrinhoService,
    private compraService: CompraService,
    private router: Router,

    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.carrinhoService.carrinho$.subscribe(carrinho => {
      this.carrinho = carrinho;
    });

    this.carrinhoService.carregarDoLocalStorage();
  }

    confirmarCompraCarrinho(): void {

      if (!this.authService.isLoggedIn()) {
        this.mostrarMensagem('Você precisa estar logado para confirmar a compra.', false);
        return;
      }

      const compraData: CompraRequest = {
        clienteId: this.authService.getClienteId(),
        mercadoId: this.mercadoId,
        total: this.calcularTotal(),
        formaPagamento: 'PIX',
        status: 'PENDENTE',
        itens: this.carrinhoService
          .obterItens()
          .map((item) => {
            console.log(item);
            return {
              produtoId: item.produto.id,
              quantidade: item.quantidade,
            };
          }),
      };

      console.log('Dados da compra:', compraData);

        this.compraService.realizarCompra(compraData).subscribe({
          next: (compraResponse) => {
            this.confirmar.emit({
              produto: this.produto,
              quantidade: this.quantidade
            });

            this.mostrarMensagem('Compra realizada com sucesso!', true);

            setTimeout(() => {
              this.fecharModal();
            }, 2000);
          },
          error: (error) => {
            this.mostrarMensagem(
              error.error?.message || error.message || 'Erro ao realizar compra',
              false
            );
            this.loading = false;
          }
        })

        this.carrinhoService.limparCarrinho();

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

  continuarComprando(): void {
    this.router.navigate(['/mercados', this.carrinho.mercadoId, 'produtos']);
  }

   aumentarQuantidade(item: any): void {
    item.quantidade++;
    this.carrinhoService.atualizarCarrinho(this.carrinho);
  }

  diminuirQuantidade(item: any): void {
    if (item.quantidade > 1) {
      item.quantidade--;
    } else {
      // Opcional: remover item se quantidade chegar a 0
      this.removerItem(item);
      return;
    }
  }

    removerItem(item: any): void {
    const index = this.carrinho.findIndex((i: any) => i.produto.id === item.produto.id);
    if (index > -1) {
      this.carrinho.splice(index, 1);
      this.carrinhoService.atualizarCarrinho(this.carrinho);
    }


  }

  calcularTotal(): number {
      let total = 0;
      for (const item of this.carrinho) {
          total += item.produto.preco * item.quantidade;
      }
      return total;
  }
}
