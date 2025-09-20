import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produto } from '../../models/produto.model';
import { MercadoService } from '../../services/mercado.service';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css']
})
export class ProdutoListComponent implements OnInit {
  produtos: Produto[] = [];
  loading: boolean = true;
  mercadoId!: number;
  nomeMercado: string = '';

  produtoSelecionado: Produto | null = null;
  showModal: boolean = false;

  constructor(
    private mercadoService: MercadoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Pega o ID do mercado da URL
    this.mercadoId = Number(this.route.snapshot.paramMap.get('id'));

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

  // Fechar modal
  fecharModal(): void {
    this.showModal = false;
    this.produtoSelecionado = null;
  }

}
