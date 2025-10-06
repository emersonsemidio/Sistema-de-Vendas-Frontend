import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  cadastroForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService) {

    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      endereco: [''],
      cpf: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  criarConta() {
    if (this.cadastroForm.valid) {
      this.loading = true;
      console.log('Dados do formulário:', this.cadastroForm.value);
      this.authService.cadastrarCliente(this.cadastroForm.value).subscribe({
        next: (response) => {
          console.log('Cliente cadastrado com sucesso:', response);
          this.toastrService.success('Cadastro realizado com sucesso! Por favor, faça o login.');
          this.router.navigate(['/login']);

          // Redirecionar ou mostrar mensagem de sucesso
        },
        error: (error) => {
          console.error('Erro ao cadastrar cliente:', error);
          // Mostrar mensagem de erro
        }
      });
    }
  }
}
