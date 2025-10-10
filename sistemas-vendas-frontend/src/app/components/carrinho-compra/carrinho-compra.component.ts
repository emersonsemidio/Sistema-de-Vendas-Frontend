import { AuthService } from './../../services/auth.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CarrinhoService, ItemCarrinho } from '../../services/carrinho.service';
import { CompraRequest, CompraService } from '../../services/compra.service';
import { Produto } from 'src/app/models/produto.model';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';

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

    private authService: AuthService,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.carrinhoService.carrinho$.subscribe(carrinho => {
      this.carrinho = carrinho;
    });

    this.carrinhoService.carregarDoLocalStorage();
  }

  async confirmarCompraCarrinho(): Promise<void> {
  if (!this.authService.isLoggedIn()) {
    this.mostrarMensagem('Você precisa estar logado para confirmar a compra.', false);
    return;
  }

  try {
    const clienteId = this.authService.getClienteId();

    // Buscar dados do cliente
    const cliente = await this.clienteService.getClienteById(clienteId).toPromise();

    if (!cliente) {
      this.mostrarMensagem('Cliente não encontrado.', false);
      return;
    }

    // Obter itens do carrinho
    const itensCarrinho = this.carrinhoService.obterItens();

    if (itensCarrinho.length === 0) {
      this.mostrarMensagem('Carrinho vazio.', false);
      return;
    }

    // Preparar dados para a mensagem
    const mensagem = this.formatarMensagemWhatsApp(cliente, itensCarrinho);

    // Codificar a mensagem para URL
    const mensagemCodificada = encodeURIComponent(mensagem);

    // Número do WhatsApp do mercado (substitua pelo número real)
    const numeroWhatsAppMercado = '5521976776113';

    // Criar URL do WhatsApp
    const urlWhatsApp = `https://wa.me/${numeroWhatsAppMercado}?text=${mensagemCodificada}`;

    // Abrir WhatsApp em nova aba
    window.open(urlWhatsApp, '_blank');

    this.mostrarMensagem('Redirecionando para o WhatsApp...', true);

    // Limpar carrinho após enviar mensagem
    this.carrinhoService.limparCarrinho();

    setTimeout(() => {
      this.fecharModal();
    }, 2000);

  } catch (error) {
    this.mostrarMensagem(
      'Erro ao preparar mensagem para WhatsApp.',
      false
    );
    this.loading = false;
  }
}

private formatarMensagemWhatsApp(cliente: Cliente, itensCarrinho: any[]): string {
  const total = this.calcularTotal();

  let mensagem = `🛒 *PEDIDO REALIZADO* 🛒\n\n`;
  mensagem += `*Cliente:* ${cliente.nome}\n`;
  mensagem += `*Endereço:* ${cliente.endereco || 'N/A'}\n`;
  mensagem += `*Telefone:* ${cliente.telefone || 'N/A'}\n\n`;

  mensagem += `*ITENS DO PEDIDO:*\n`;
  mensagem += `--------------------------------\n`;

  itensCarrinho.forEach((item, index) => {
    mensagem += `${index + 1}. ${item.produto.nome}\n`;
    mensagem += `   Quantidade: ${item.quantidade}\n`;
    mensagem += `   Preço unitário: R$ ${item.produto.preco.toFixed(2)}\n`;
    mensagem += `   Subtotal: R$ ${(item.produto.preco * item.quantidade).toFixed(2)}\n\n`;
  });

  mensagem += `--------------------------------\n`;
  mensagem += `*TOTAL: R$ ${total.toFixed(2)}*\n\n`;
  mensagem += `*Forma de Pagamento:* PIX\n`;
  mensagem += `*Status:* PENDENTE\n\n`;
  mensagem += `Aguardando confirmação do mercado.`;

  return mensagem;
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
