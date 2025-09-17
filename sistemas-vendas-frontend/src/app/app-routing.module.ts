import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MercadoListComponent } from './components/mercado-list/mercado-list.component';

const routes: Routes = [
  { path: 'mercados', component: MercadoListComponent }, // ← Rota para seu componente
  { path: '', redirectTo: '/mercados', pathMatch: 'full' } // ← Redireciona para mercados
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
