import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  constructor(private http: HttpClient) {}
  optionValue = 'City';
  searchText: string = '';
  selectedToken: any = {};
  placeholder: string = 'City';
  public keepOriginalOrder = (a, b) => a.key;
  geoJSONData: any;
  neighborhoods: any = {};
  neighborhoodname: any[] = [];
  backspaceCount: number = 0;
  lastDivOpacity: number = 1;

  ngOnInit(): void {
    this.loadGeoJSONData();
  }
  loadGeoJSONData(): void {
    this.http
      .get('../../../../assets/toronto-on_.geojson')
      .subscribe((data: any) => {
        data.features.forEach((feature: any) => {
          const geometry = feature.geometry;
          this.neighborhoodname.push(feature.properties.name + ', Toronto');
          const neigborhood = feature.properties.name;
          const coordinates = geometry.coordinates;
          coordinates.forEach((multiPolygon: any) => {
            multiPolygon.forEach((polygonCoordinates: any) => {
              // Transform GeoJSON coordinates to LatLng format
              const paths = polygonCoordinates.map((ring: any) => {
                return {
                  lat: parseFloat(ring[1]),
                  lng: parseFloat(ring[0]),
                };
              });
              const boundary = new google.maps.Polygon({
                paths: paths,
                strokeColor: '#000000',
                strokeOpacity: 0.5,
                strokeWeight: 1,
                fillColor: 'none',
                fillOpacity: 0.2,
              });
              this.neighborhoods[neigborhood] = boundary;
            });
          });
        });
      });
  }
  typeText(event) {
    this.searchText = event.target.value;
  }

  @Input() mapView: boolean = false;

  searchOptions: String[] = ['City', 'Community', 'Address', 'MLS ® #'];

  public closeMap($event: any): void {
    this.mapView = $event;
  }
  setPlaceholder(option: any) {
    this.placeholder = option;
  }
  updatedSearchText(event: any) {
    this.searchText = event.target.value;
  }
  onBackspace(event) {
    if (!this.searchText) {
      if (event.key === 'Backspace') {
        this.backspaceCount++;

        if (this.backspaceCount === 2) {
          // Reset backspace count
          this.backspaceCount = 0;
          this.lastDivOpacity = 1;
          const selectedTokenKeys = Object.keys(this.selectedToken);
          if (selectedTokenKeys.length > 0) {
            const lastKey = selectedTokenKeys[selectedTokenKeys.length - 1];
            delete this.selectedToken[lastKey];
          }
        } else if (this.backspaceCount === 1) {
          this.lastDivOpacity -= 0.3;
          console.log(this.lastDivOpacity);
        }
      } else {
        // Reset backspace count if any other key is pressed
        this.backspaceCount = 0;
        this.lastDivOpacity = 1;
      }
    }
  }
  deleteSelectToken(key: any, value: any) {
    delete this.selectedToken[key];
    this.neighborhoodname.push(key);
  }
  public addSelectToken(selectedToken: any): void {
    this.selectedToken = selectedToken;
  }
  addselectedToken(item) {
    if (!this.selectedToken[item]) {
      this.selectedToken[item] = this.neighborhoods[item];
    }
    this.neighborhoodname.splice(this.neighborhoodname.indexOf(item), 1);
    this.searchText = '';
  }

  @Output()
  onMapOpen: EventEmitter<boolean> = new EventEmitter<boolean>();
  public openMapView(): void {
    this.mapView = true;
    this.onMapOpen.emit(this.mapView);
  }
}
