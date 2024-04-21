import { Component, Input, ViewChild } from '@angular/core';
//component
@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrl: './container.component.css',
})
export class ContainerComponent {
  mapView = false;

  public openMap($event: any): void {
    this.mapView = $event;
  }
}
