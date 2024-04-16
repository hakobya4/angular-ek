import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var google: any;

@Component({
  selector: 'map-view',
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css',
})
export class MapViewComponent implements OnInit {
  constructor(private http: HttpClient) {}

  map: google.maps.Map;
  label: any = '0px';

  gtaBoundaries: any;
  neigborhoodName: string = '';
  communityTokens: any = {};
  public keepOriginalOrder = (a, b) => a.key;
  numberOfPairs: any;
  latLng: any[] = [];

  ngOnInit(): void {
    this.loadGeoJSONData();
    if (this.reselectedToken) {
      this.communityTokens = this.reselectedToken;
    }
  }
  @Input()
  mapClose = false;
  @Input()
  reselectedToken: any;
  @Output()
  onMapClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  public closeMapView(): void {
    this.mapClose = false;
    this.onMapClose.emit(this.mapClose);
  }
  @Output()
  onSelectToken: EventEmitter<any[]> = new EventEmitter<any[]>();
  public selectToken(token: any[]): void {
    this.onSelectToken.emit(token);
  }
  loadGeoJSONData(): void {
    this.http
      .get('../../../../assets/toronto-on_.geojson')
      .subscribe((data: any) => {
        this.gtaBoundaries = data;
        this.initMap();
        this.drawBoundaries();
      });
  }
  initMap(): void {
    this.label = document.getElementById('overlay');
    const mapOptions: google.maps.MapOptions = {
      center: { lat: 43.65107, lng: -79.347015 }, // Set initial center coordinates
      zoom: 10, // Set initial zoom level
    };
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  deleteToken(key: any, value: any): void {
    value.setOptions({ fillOpacity: 0.2 });
    delete this.communityTokens[key];
    this.numberOfPairs = Object.keys(this.communityTokens).length;
  }

  drawBoundaries(): void {
    this.gtaBoundaries.features.forEach((feature: any) => {
      const geometry = feature.geometry;
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
            content: neigborhood,
          });

          // Add event listeners for mouseover and mouseout
          boundary.addListener('mouseover', (event) => {
            const mouseX = event.domEvent.clientX;
            const mouseY = event.domEvent.clientY;
            this.label.style.left = mouseX + 'px';
            this.label.style.top = mouseY + 'px';
            this.label.style.display = 'block';
            this.neigborhoodName = neigborhood + ', Toronto';
          });

          boundary.addListener('mouseout', (event) => {
            // Revert to original style
            this.neigborhoodName = '';
            this.label.style.display = 'none';
          });
          boundary.addListener('click', (event) => {
            if (this.neigborhoodName in this.communityTokens) {
              delete this.communityTokens[this.neigborhoodName];
              this.numberOfPairs = Object.keys(this.communityTokens).length;
              boundary.setOptions({ fillOpacity: 0.2 });
            } else {
              this.communityTokens[this.neigborhoodName] = boundary;
              this.numberOfPairs = Object.keys(this.communityTokens).length;
              boundary.setOptions({ fillOpacity: 0.6 });
            }
          });
          boundary.setMap(this.map);
        });
      });
    });
  }
}
