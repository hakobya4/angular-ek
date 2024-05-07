import { Component, Input, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { LoginFormComponent } from "../login-form/login-form.component";
import { fetchAPI } from "src/app/services/fetch-api-data.service";
@Component({
  selector: "app-register-form",
  templateUrl: "./register-form.component.html",
  styleUrl: "./register-form.component.css",
})
export class RegisterFormComponent {
  @Input() userData = {
    Username: "",
    Password: "",
    Email: "",
    Birthday: "",
  };

  formPassword = "";
  constructor(
    public dialogRef: MatDialogRef<RegisterFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
    public fetchAPI: fetchAPI
  ) {}
  openLoginDialog() {
    this.dialogRef.close();
    this.dialog.open(LoginFormComponent, {
      width: "40%",
      height: "60%",
    });
  }
  closeDialogButton() {
    this.dialogRef.close();
  }
  registerUser(): void {
    this.fetchAPI.userRegistration(this.userData).subscribe(
      () => {
        // Logic for a successful user registration goes here! (To be implemented)
        this.dialogRef.close(); // This will close the modal on success!
        this.snackBar.open("SignUp Successful", "OK", {
          duration: 2000,
        });
      },
      () => {
        this.snackBar.open("Fields Missing Values or User Exists", "OK", {
          duration: 2000,
        });
      }
    );
  }
}
