import { Component, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  @Input()
  all: number=0
  @Input()
  inStock: number=0
  @Input()
  outOfStock: number=0
  selectedFilterRadioButtonChanged:EventEmitter<string> = new EventEmitter<string>();
  selectedFilterRadioButton: string= 'all'
  onSelectedFilterRadioButtonChanged(){
    this.selectedFilterRadioButtonChanged.emit(this.selectedFilterRadioButton)
  }
}
