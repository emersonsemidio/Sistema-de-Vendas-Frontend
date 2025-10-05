import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MercadoListComponent } from './components/mercado-list/mercado-list.component';
import { ProdutoListComponent } from './components/produto-list/produto-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'mercados', component: MercadoListComponent }, // ← Rota para seu componente
  { path: 'produtos', component: ProdutoListComponent },
  { path: 'mercados/:id/produtos', component: ProdutoListComponent,  }, // ← Rota para o componente de produtos
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' } // Rota padrão redirecionando para /mercados
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
