import { Component, Input, NgZone, AfterViewInit } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RegisterFormComponent } from '../register-form/register-form.component';
declare const gapi: any;
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  private auth2: any;
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
    private ngZone: NgZone
  ) {}
  ngAfterViewInit() {
    this.googleInit();
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          '414696942433-abqv4vfbhfkr1fuqhiohf606c344h0q1.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });
      this.attachSignin(document.getElementById('google-sign-in-btn'));
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(
      element,
      {},
      (googleUser) => {
        this.ngZone.run(() => {
          // Handle successful sign-in here
          console.log('Google Sign-in successful');
          const profile = googleUser.getBasicProfile();
          console.log('ID: ' + profile.getId());
          console.log('Name: ' + profile.getName());
          console.log('Image URL: ' + profile.getImageUrl());
          console.log('Email: ' + profile.getEmail());
        });
      },
      (error) => {
        if (error.error === 'popup_closed_by_user') {
          console.log('User closed the sign-in popup.');
        } else {
          console.error('Google Sign-in error', error);
        }
      }
    );
  }

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
}
