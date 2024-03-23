import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PostingsComponent } from './container/postings/postings.component';
import { SearchComponent } from './container/search/search.component';
import { ContainerComponent } from './container/container.component';
import { SetBackground } from './CustomDirectives/SetBackground.directive';
import { HighlightDirective } from './CustomDirectives/highlight.directive';
import { AppHoverDirective } from './CustomDirectives/app-hover.directive';
import { DisableProductDirective } from './CustomDirectives/disable-product.directive';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostingsComponent,
    SearchComponent,
    ContainerComponent,
    SetBackground,
    HighlightDirective,
    AppHoverDirective,
    DisableProductDirective,
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
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
