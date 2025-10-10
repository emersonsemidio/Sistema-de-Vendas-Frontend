import { Component, HostListener } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sistemas-vendas-frontend';
  usuarioEstaLogado!: boolean; // Mude para false inicialmente
  dropdownOpen = false;
  currentUser: any;

  showModalCarrinho: boolean = false;

  abrirModalCarrinho(): void {
    this.showModalCarrinho = true;
  }

  fecharModalCarrinho(): void {
    this.showModalCarrinho = false;
  }

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

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.usuarioEstaLogado = this.authService.isLoggedIn();
    console.log('Status inicial de login:', this.usuarioEstaLogado);
    this.checkAuthStatus();
  }

  checkAuthStatus() {
    this.authService.isLoggedInObs.subscribe(status => {
      this.usuarioEstaLogado = status;
      console.log('Status de login atualizado:', this.usuarioEstaLogado);
      // this.updateCurrentUser();
      if (this.usuarioEstaLogado) {
        this.currentUser = this.authService.getCurrentUser();
        console.log('👤 Usuário logado:', this.currentUser);
      } else {
        this.currentUser = null;
        this.dropdownOpen = false; // Fecha dropdown se deslogar
      }
    });

  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  logout() {
    this.authService.logout();
    // this.checkAuthStatus(); // Atualiza o status após logout
  }
}
