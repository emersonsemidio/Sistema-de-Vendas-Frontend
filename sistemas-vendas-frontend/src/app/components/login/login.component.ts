import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) { }

  login(email: string, password: string): void {
    this.authService.login(email, password).subscribe({
      next: (response) => {
        this.toastr.success('Login realizado com sucesso!');
        this.router.navigate(['/mercados']);
      },
      error: (error) => {
        this.toastr.error('Erro ao fazer login! Verifique suas credenciais e tente novamente.', error.message);
      }
    });
  }
}
