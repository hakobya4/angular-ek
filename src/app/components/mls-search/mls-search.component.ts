import { Component } from "@angular/core";

@Component({
  selector: "mls-search",
  templateUrl: "./mls-search.component.html",
  styleUrl: "./mls-search.component.css",
})
export class MlsSearchComponent {
  mapView = false;

  public openMap($event: any): void {
    this.mapView = $event;
  }
}
