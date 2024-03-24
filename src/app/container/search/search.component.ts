import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  optionValue = 'City';
  searchText: string = '';
  @Input() mapView: boolean = false;

  searchOptions: String[] = ['City', 'Community', 'Address', 'MLS ® #'];
  @Output()
  onSearchTextChanges: EventEmitter<string> = new EventEmitter<string>();
  onSearchTextChanged() {
    this.onSearchTextChanges.emit(this.searchText);
  }

  updatedSearchText(event: any) {
    this.searchText = event.target.value;
  }
  @Output()
  onMapOpen: EventEmitter<boolean> = new EventEmitter<boolean>();
  public openMapView(): void {
    this.mapView = true;
    this.onMapOpen.emit(this.mapView);
  }
}
