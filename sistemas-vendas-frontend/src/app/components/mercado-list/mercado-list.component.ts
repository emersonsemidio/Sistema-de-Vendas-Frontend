import { Component, OnInit } from '@angular/core';
import { Mercado } from '../../models/mercado.model';
import { MercadoService } from '../../services/mercado.service';

@Component({
  selector: 'app-mercado-list',
  templateUrl: './mercado-list.component.html',
  styleUrls: ['./mercado-list.component.css']
})
export class MercadoListComponent implements OnInit {
  mercados: Mercado[] = [];
  loading: boolean = true;

  constructor(private mercadoService: MercadoService) { }

  ngOnInit(): void {
    this.carregarMercados();
  }

  carregarMercados(): void {
    this.mercadoService.getAll().subscribe({
      next: (data) => {
        this.mercados = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar mercados:', error);
        this.loading = false;
      }
    });
  }

  verProdutos(mercadoId: number): void {
    // Navegar para a página de produtos do mercado
    console.log('Acessar produtos do mercado:', mercadoId);
    // this.router.navigate(['/mercados', mercadoId, 'produtos']);
  }
}
