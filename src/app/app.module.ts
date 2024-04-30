import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { PostingsComponent } from "./home-page/postings/postings.component";
import { SearchComponent } from "./home-page/search/search.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { CarouselModule } from "primeng/carousel";
import { ButtonModule } from "primeng/button";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatNativeDateModule } from "@angular/material/core";
import { MapViewComponent } from "./home-page/search/map-view/map-view.component";
import { MatCardModule } from "@angular/material/card";
import { GoogleMapsModule } from "@angular/google-maps";
import { MatDialogModule } from "@angular/material/dialog";
import { RegisterFormComponent } from "./header/register-form/register-form.component";
import { LoginFormComponent } from "./header/login-form/login-form.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatListModule } from "@angular/material/list";
import { RouterModule, Routes } from "@angular/router";
import { ProfilePageComponent } from "./profile-page/profile-page.component";
import { authGuard } from "./guards/auth.guards";
import { AboutPageComponent } from "./about-page/about-page.component";
import { ChatComponent } from "./chat/chat.component";
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { provideFirebaseApp, getApp, initializeApp } from "@angular/fire/app";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { environment } from "./environment";

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
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
