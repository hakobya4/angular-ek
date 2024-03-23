import { Component, Input, ViewChild } from '@angular/core';
import { PostingsComponent } from './postings/postings.component';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrl: './container.component.css',
})
export class ContainerComponent {
  searchText: string = '';
  @ViewChild(PostingsComponent) productListComponent: PostingsComponent;
  setSearchText(value: string) {
    this.searchText = value;
  }
}
