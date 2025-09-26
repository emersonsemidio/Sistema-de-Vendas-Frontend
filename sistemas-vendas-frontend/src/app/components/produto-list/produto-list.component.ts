import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produto } from '../../models/produto.model';
import { MercadoService } from '../../services/mercado.service';
import { CompraService, CompraRequest, CompraResponse } from '../../services/compra.service';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css']
})
export class ProdutoListComponent implements OnInit {
  produtos: Produto[] = [];
  loading: boolean = true;
  mercadoId!: number;
  produtoSelecionado: Produto | null = null;
  showModal: boolean = false;

  showModalCarrinho: boolean = false; // NOVO: Controla exibição do modal do carrinho

  clienteTeste: any = {
    id: 1, // ⚠️ Altere para um ID que exista no seu backend
    nome: 'Cliente Teste',
    email: 'cliente@teste.com',
    telefone: '(11) 99999-9999',
    endereco: 'Rua Teste, 123'
  };

  constructor(
    private mercadoService: MercadoService,
    private compraService: CompraService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.mercadoId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Mercado ID:', this.mercadoId);
    this.carregarProdutosDoMercado();
  }

  carregarProdutosDoMercado(): void {
    this.loading = true;
    this.mercadoService.getProdutosByMercadoId(this.mercadoId).subscribe({
      next: (data) => {
        this.produtos = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar produtos:', error);
        this.loading = false;
      }
    });
  }

  // Abrir modal para selecionar quantidade
  abrirModalQuantidade(produto: Produto): void {
    this.produtoSelecionado = produto;
    this.showModal = true;
  }


  abrirModalCarrinho(): void {
    this.showModalCarrinho = true;
  }

  XPOO(): void {
    this.showModalCarrinho = true;
  }

  // Fechar modal
  fecharModal(): void {
    this.showModal = false;
    this.produtoSelecionado = null;
  }

  fecharModalCarrinho(): void {
    this.showModalCarrinho = false;
  }

  // ADICIONAR no ProdutoListComponent
  onCompraRealizada(dados: {produto: Produto, quantidade: number}): void {
    console.log('Compra concluída:', dados);
    this.carregarProdutosDoMercado(); // Atualiza estoque
    this.fecharModal(); // Fecha modal
  }

}
