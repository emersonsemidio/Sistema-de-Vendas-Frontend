import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { MercadoService } from './services/mercado.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'sistemas-vendas-frontend';
}
