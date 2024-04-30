import { Component, OnInit, Input } from "@angular/core";

// This import brings in the API calls
import { fetchAPI } from "../../services/fetch-api-data.service";
@Component({
  selector: "postings",
  templateUrl: "./postings.component.html",
  styleUrls: ["./postings.component.css"],
})
export class PostingsComponent implements OnInit {
  postings: any[] = [];
  responsiveOptions: any[] | undefined;
  @Input()
  searchText = "";

  constructor(public fetchApi: fetchAPI) {}
  ngOnInit(): void {
    this.fetchApi.getListings().subscribe((result) => {
      console.log(result);
      this.postings = result.listings;
      return this.postings;
    });
    this.responsiveOptions = [
      {
        breakpoint: "1100px",
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: "800px",
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: "600px",
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
}
