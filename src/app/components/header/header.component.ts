import { Component, OnInit, inject } from "@angular/core";
import { LoginFormComponent } from "./login-form/login-form.component";
import { MatDialog } from "@angular/material/dialog";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { environment } from "src/app/environment";
import { ChatService } from "src/app/services/chat.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  name: any;
  loading = false;
  auth = inject(AuthService);
  user: boolean = false;
  email: any;
  admin = environment.admin_email;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private chatService: ChatService
  ) {}
  ngOnInit() {
    if (sessionStorage.getItem("loggedInUser")) {
      this.user = true;
      this.name = JSON.parse(sessionStorage.getItem("loggedInUser"))?.name;
      this.email = JSON.parse(sessionStorage.getItem("loggedInUser"))?.email;
    } else if (localStorage.getItem("username")) {
      this.user = true;
      this.name = localStorage.getItem("username");
    } else {
      this.user = false;
    }
  }
  openUserLoginDialog(): void {
    this.loading = true;
    const dialogRef = this.dialog.open(LoginFormComponent, {
      width: "40%",
      height: "60%",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (JSON.parse(sessionStorage.getItem("loggedInUser"))?.name) {
        this.user = true;
        this.name = JSON.parse(sessionStorage.getItem("loggedInUser"))?.name;
        this.email = JSON.parse(sessionStorage.getItem("loggedInUser"))?.email;
        this.loading = false;
      } else if (localStorage.getItem("username")) {
        this.user = true;
        this.name = localStorage.getItem("username");
        this.loading = false;
      } else {
        this.loading = false;
      }
    });
  }
  signOut() {
    sessionStorage.removeItem("loggedInUser");
    this.auth.signOut();
    this.user = false;
    this.email = false;
    this.router.navigate(["welcome"]);
    localStorage.clear();
  }
  profileView(): void {
    this.router.navigate(["profile"]);
  }
  aboutView(): void {
    this.router.navigate(["about"]);
  }
  adminView() {
    this.router.navigate(["admin"]);
  }
  mlsView() {
    this.router.navigate(["mls"]);
  }
  contactView() {
    this.router.navigate(["contact"]);
  }
}
