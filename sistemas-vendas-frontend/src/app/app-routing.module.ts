import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MercadoListComponent } from './components/mercado-list/mercado-list.component';
import { ProdutoListComponent } from './components/produto-list/produto-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth-guard.service';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { SobreComponent } from './components/sobre/sobre.component';
import { ContatoComponent } from './components/contato/contato.component';

const routes: Routes = [
  { path: 'mercados', component: MercadoListComponent }, // ← Rota para seu componente
  { path: 'produtos', component: ProdutoListComponent },
  { path: 'mercados/:id/produtos', component: ProdutoListComponent,  }, // ← Rota para o componente de produtos
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'sobre', component: SobreComponent },
  { path: 'contato', component: ContatoComponent }
   // Rota para o componente de contato
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
