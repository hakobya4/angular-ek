import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { PostingsComponent } from "./components/home-page/postings/postings.component";
import { SearchComponent } from "./components/search/search.component";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { CarouselModule } from "primeng/carousel";
import { ButtonModule } from "primeng/button";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatNativeDateModule } from "@angular/material/core";
import { MapViewComponent } from "./components/search/map-view/map-view.component";
import { MatCardModule } from "@angular/material/card";
import { GoogleMapsModule } from "@angular/google-maps";
import { MatDialogModule } from "@angular/material/dialog";
import { RegisterFormComponent } from "./components/header/register-form/register-form.component";
import { LoginFormComponent } from "./components/header/login-form/login-form.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatListModule } from "@angular/material/list";
import { RouterModule, Routes } from "@angular/router";
import { ProfilePageComponent } from "./components/profile-page/profile-page.component";
import { authGuard } from "./guards/auth.guards";
import { AboutPageComponent } from "./components/about-page/about-page.component";
import { ChatComponent } from "./components/chat/chat.component";
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { provideFirebaseApp, getApp, initializeApp } from "@angular/fire/app";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { environment } from "./environment";
import { ChatService } from "./services/chat.service";
import { AdminChatComponent } from "./components/admin-chat/admin-chat.component";
import { adminAuthGuard } from "./guards/adminauth.guards";

const config: SocketIoConfig = { url: "http://localhost:3000", options: {} };

const appRoutes: Routes = [
  { path: "welcome", component: HomePageComponent },
  { path: "about", component: AboutPageComponent },
  {
    path: "profile",
    component: ProfilePageComponent,
    canActivate: [authGuard],
  },
  { path: "", redirectTo: "welcome", pathMatch: "prefix" },
  {
    path: "admin",
    component: AdminChatComponent,
    canActivate: [adminAuthGuard],
  },
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostingsComponent,
    SearchComponent,
    HomePageComponent,
    MapViewComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ProfilePageComponent,
    AboutPageComponent,
    ChatComponent,
    AdminChatComponent,
  ],
  imports: [
    CarouselModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatNativeDateModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatListModule,
    RouterModule.forRoot(appRoutes),
    GoogleMapsModule,
    SocketIoModule.forRoot(config),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [provideAnimationsAsync(), ChatService],
  bootstrap: [AppComponent],
})
export class AppModule {}
