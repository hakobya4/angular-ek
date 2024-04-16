import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';

// This import brings in the API calls

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RegisterFormComponent } from '../register-form/register-form.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent implements OnInit {
  user: SocialUser;
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
    private authService: SocialAuthService
  ) {}

  ngOnInit(): void {}

  openRegisterDialog() {
    this.dialogRef.close();
    this.dialog.open(RegisterFormComponent, {
      width: '50%',
      height: '70%',
    });
  }
  closeDialogButton() {
    this.dialogRef.close();
  }
  signInWithGoogle(): void {
    this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user) => {
        this.user = user;
        // Do something with the user data like send it to the backend
      })
      .catch((error) => {
        console.error('Error logging in with Google: ', error);
      });
  }
  signOut(): void {
    this.authService.signOut();
  }
}
