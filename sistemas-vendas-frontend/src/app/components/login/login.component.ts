import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  constructor(private authService: AuthService) { }

    login(): void {
    this.authService.login('string', 'string').subscribe({
      next: (response) => {
        console.log('Login bem-sucedido:', response);
      },
      error: (error) => {
        console.error('Erro no login:', error);
      }
    });
  }
}
