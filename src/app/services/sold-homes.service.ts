import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class SoldHomes {
  public soldHomes = [
    {
      mlsNumber: "E5604057",
      type: "Sold",
      listPrice: "899,000.00",
      soldPrice: "1,010,000.00",
      address: {
        streetName: "Croach",
        streetNumber: "12",
        streetSuffix: "Cres.",
      },
      image: "12 Croach Cres.jpg",
      details: {
        numBedrooms: "5",
        numBathrooms: "3",
      },
    },
    {
      mlsNumber: "E4479115",
      type: "Sold",
      listPrice: "767,000.00",
      soldPrice: "765,000.00",
      address: {
        streetName: "Pringdale Gardens",
        streetNumber: "99",
        streetSuffix: "Circ",
      },
      image: "99 Pringdale Gardens.jpg",
      details: {
        numBedrooms: "3",
        numBathrooms: "3",
      },
    },
  ];
}
