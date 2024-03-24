import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { MapViewComponent } from './container/search/map-view/map-view.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'Angular-Ek';
}
