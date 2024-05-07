import { Component, Input, ViewChild } from "@angular/core";
//component
@Component({
  selector: "home-page",
  templateUrl: "./home-page.component.html",
  styleUrl: "./home-page.component.css",
})
export class HomePageComponent {
  mapView = false;

  public openMap($event: any): void {
    this.mapView = $event;
  }
}
