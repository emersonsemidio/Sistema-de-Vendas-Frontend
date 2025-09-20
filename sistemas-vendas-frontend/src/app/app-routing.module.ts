import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MercadoListComponent } from './components/mercado-list/mercado-list.component';
import { ProdutoListComponent } from './components/produto-list/produto-list.component';

const routes: Routes = [
  { path: 'mercados', component: MercadoListComponent }, // ← Rota para seu componente
  { path: 'produtos', component: ProdutoListComponent },
  { path: 'mercados/:id/produtos', component: ProdutoListComponent } // ← Rota para o componente de produtos
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
