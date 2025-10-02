import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { EmailValidator, FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { FormsModule } from '@angular/forms';

  interface LoginForm {
    email: FormControl;
    senha: FormControl;
  }


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']



})
export class LoginComponent {


  constructor(private authService: AuthService, private notificationService: NotificationService) { }

    loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })

  login(email: string, password: string): void {
    this.authService.login(email, password).subscribe({
      next: (response) => {
        this.notificationService.success('Login bem-sucedido!', response.cliente.nome);
      },
      error: (error) => {
        this.notificationService.error('Erro ao fazer login:', error);
      }
    });
  }
}
