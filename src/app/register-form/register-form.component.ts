import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginFormComponent } from '../login-form/login-form.component';
@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  @Input() userData = {
    Username: '',
    Password: '',
    ConfirmPassword: '',
    Email: '',
  };

  formPassword = '';
  formConfirmPassword = '';
  constructor(
    public dialogRef: MatDialogRef<RegisterFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) {}
  openLoginDialog() {
    this.dialogRef.close();
    this.dialog.open(LoginFormComponent, {
      width: '40%',
      height: '60%',
    });
  }
  closeDialogButton() {
    this.dialogRef.close();
  }
}
