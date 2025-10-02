import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  success(message: string, title?: string): void {
    console.log('✅ SUCCESS:', title, message);
    alert(`${title ? title + ': ' : ''}${message}`);
  }

  error(message: string, title?: string): void {
    console.error('❌ ERROR:', title, message);
    alert(`ERRO: ${title ? title + ': ' : ''}${message}`);
  }

  warning(message: string, title?: string): void {
    console.warn('⚠️ WARNING:', title, message);
    alert(`AVISO: ${title ? title + ': ' : ''}${message}`);
  }

  info(message: string, title?: string): void {
    console.info('ℹ️ INFO:', title, message);
    alert(`INFO: ${title ? title + ': ' : ''}${message}`);
  }
}
