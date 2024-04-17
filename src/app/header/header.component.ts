import { Component } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public dialog: MatDialog) {}

  openUserLoginDialog(): void {
    this.dialog.open(LoginFormComponent, {
      width: '40%',
      height: '60%',
    });
  }
}
