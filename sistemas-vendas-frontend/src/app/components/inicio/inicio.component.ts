import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
produtosDestaque = [
    {
      nome: 'Big Burger Artesanal',
      descricao: '180g de carne, queijo cheddar, bacon e molho especial',
      preco: 29.90,
      imagem: 'assets/images/burger-1.jpg'
    },
    {
      nome: 'Frango Crispy',
      descricao: 'Filé de frango empanado, alface e maionese caseira',
      preco: 24.90,
      imagem: 'assets/images/burger-2.jpg'
    },
    {
      nome: 'Duplo Bacon',
      descricao: 'Duas carnes, duplo bacon e cebola caramelizada',
      preco: 34.90,
      imagem: 'assets/images/burger-3.jpg'
    }
  ];

  depoimentos = [
    {
      nome: 'Carlos Silva',
      avaliacao: 5,
      texto: 'Melhor hambúrguer da cidade! Todo final de semana estou aqui.'
    },
    {
      nome: 'Marina Santos',
      avaliacao: 5,
      texto: 'Ingredientes frescos e atendimento incrível. Recomendo!'
    },
    {
      nome: 'João Pereira',
      avaliacao: 4.5,
      texto: 'Lanches saborosos e entrega sempre no prazo. Nota 10!'
    }
  ];
}
