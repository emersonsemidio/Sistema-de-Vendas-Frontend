import { Component } from '@angular/core';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent {

  openWhatsApp() {
    const phoneNumber = '5521976776113';
    const message = 'Olá! Gostaria de fazer um pedido na lanchonete.';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

  sendEmail() {
    const email = 'contato@lanchonete.com.br';
    const subject = 'Contato - Lanchonete';
    const body = 'Olá! Gostaria de mais informações sobre...';
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  }

  // Métodos adicionais para redes sociais
  openInstagram() {
    window.open('https://instagram.com/lanchonete.oficial', '_blank');
  }

  openFacebook() {
    window.open('https://facebook.com/LanchoneteOficial', '_blank');
  }

  openTikTok() {
    window.open('https://tiktok.com/@lanchonete.videos', '_blank');
  }
}
