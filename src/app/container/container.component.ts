import { Component, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrl: './container.component.css',
})
export class ContainerComponent {
  searchText: string = '';
  @ViewChild(ProductListComponent) productListComponent: ProductListComponent;
  setSearchText(value: string) {
    this.searchText = value;
  }
}
