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
}
