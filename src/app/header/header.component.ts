import { Component, OnInit, inject } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  name = JSON.parse(sessionStorage.getItem('loggedInUser'))?.name;

  auth = inject(AuthService);
  user: boolean = false;

  constructor(public dialog: MatDialog) {}
  ngOnInit() {
    if (sessionStorage.getItem('loggedInUser')) {
      this.user = true;
    }
  }
  openUserLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginFormComponent, {
      width: '40%',
      height: '60%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (sessionStorage.getItem('loggedInUser')) {
        this.user = true;
        this.name = JSON.parse(sessionStorage.getItem('loggedInUser')!).name;
      }
    });
  }
  signOut() {
    sessionStorage.removeItem('loggedInUser');
    this.auth.signOut();
    this.user = false;
  }
}
