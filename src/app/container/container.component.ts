import { Component, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrl: './container.component.css',
})
export class ContainerComponent {
  searchText: string = '';
  mapView = false;
  setSearchText(value: string) {
    this.searchText = value;
  }
  public openMap($event: any): void {
    this.mapView = $event;
  }
  public closeMap($event: any): void {
    this.mapView = $event;
  }
}
