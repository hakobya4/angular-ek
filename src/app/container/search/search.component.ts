import { Component, EventEmitter, Output  } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchText: string = ''
  @Output()
  onSearchTextChanges: EventEmitter<string> = new EventEmitter<string>()
  onSearchTextChanged(){
    this.onSearchTextChanges.emit(this.searchText)
  }

  updatedSearchText(event:any){
    this.searchText=event.target.value
  }
}
