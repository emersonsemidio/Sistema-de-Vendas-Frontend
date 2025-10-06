import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor'; // Importar o interceptor


// Importar o componente
import { MercadoListComponent } from './components/mercado-list/mercado-list.component';
import { ProdutoListComponent } from './components/produto-list/produto-list.component';
import { QuantidadeModalComponent } from './components/quantidade-modal/quantidade-modal.component';
import { CarrinhoComponent } from './components/carrinho-compra/carrinho-compra.component';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';

@NgModule({
  declarations: [
    // ... outros componentes
    MercadoListComponent,
    ProdutoListComponent,
    AppComponent,
    QuantidadeModalComponent,
    CarrinhoComponent,
    CadastroComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      maxOpened: 3,
      preventDuplicates: true,
      progressBar: true,
    }), // ToastrModule added
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
