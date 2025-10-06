import { AuthService } from 'src/app/services/auth.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.css']
})
export class UserDropdownComponent {

  constructor(private authService: AuthService) { }

  @Input() isOpen = false;
  @Input() user: any;
  @Output() logout = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  onLogout() {
    this.authService.logout();
  }

  onClose() {
    this.close.emit();
  }
}
