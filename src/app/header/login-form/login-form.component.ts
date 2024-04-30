import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";

// You'll use this import to close the dialog on success
import { MatDialogRef } from "@angular/material/dialog";
// This import brings in the API calls

// This import is used to display notifications back to the user
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { RegisterFormComponent } from "../register-form/register-form.component";
import { environment } from "../../environment";
import { fetchAPI } from "src/app/services/fetch-api-data.service";

declare var google: any;
@Component({
  selector: "login-form",
  templateUrl: "./login-form.component.html",
  styleUrl: "./login-form.component.css",
})
export class LoginFormComponent implements OnInit {
  loggedInUser: any;
  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: (resp: any) => {
        this.handleGoogleLogin(resp);
      },
    });
    google.accounts.id.renderButton(document.getElementById("google-btn"), {
      theme: "filled_blue",
      size: "large",
      shape: "rectangle",
    });
  }
  @Input() userData = { Username: "", Password: "" };

  constructor(
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
    public fetchAPI: fetchAPI
  ) {}

  openRegisterDialog() {
    this.dialogRef.close();
    this.dialog.open(RegisterFormComponent, {
      width: "50%",
      height: "80%",
    });
  }
  closeDialogButton() {
    this.dialogRef.close();
  }
  private decodeToken(token: string) {
    return JSON.parse(atob(token.split(".")[1]));
  }
  handleGoogleLogin(user: any) {
    if (user) {
      const payLoad = this.decodeToken(user.credential);
      sessionStorage.setItem("loggedInUser", JSON.stringify(payLoad));
      this.closeDialogButton();
    }
  }
  loginUser(): void {
    this.fetchAPI.userLogin(this.userData).subscribe(
      (result) => {
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("username", result.user.Username);
        localStorage.setItem("token", result.token);
        // Logic for a successful user login goes here! (To be implemented)
        this.dialogRef.close(); // This will close the modal on success!
        this.snackBar.open("Login Successful", "OK", {
          duration: 2000,
        });
      },
      () => {
        this.snackBar.open("Incorrect Username or Password", "OK", {
          duration: 2000,
        });
      }
    );
  }
}
