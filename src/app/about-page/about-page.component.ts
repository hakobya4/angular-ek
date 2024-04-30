import { Component, OnInit } from "@angular/core";
import { SoldHomes } from "../services/sold-homes.service";

@Component({
  selector: "about-page",
  templateUrl: "./about-page.component.html",
  styleUrl: "./about-page.component.css",
})
export class AboutPageComponent implements OnInit {
  constructor(public soldHomes: SoldHomes) {}
  homesSold: any;
  public keepOriginalOrder = (a, b) => a.key;
  ngOnInit(): void {
    this.homesSold = this.soldHomes.soldHomes;
    console.log(this.homesSold);
  }
}
