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
