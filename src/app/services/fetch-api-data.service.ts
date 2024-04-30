import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../environment";

const apiUrl = "https://api.repliers.io/listings?hasImages=true";
const apiUserUrl = "https://movie-api-myflix-39dfea723223.herokuapp.com/";
@Injectable({
  providedIn: "root",
})
export class fetchAPI {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  getListings(): Observable<any> {
    return this.http
      .get<any>(apiUrl, {
        headers: new HttpHeaders({
          "REPLIERS-API-KEY": environment.repliersAPI,
          "content-type": "application/json",
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUserUrl + "users", userDetails)
      .pipe(catchError(this.handleError));
  }

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUserUrl + "login", userDetails)
      .pipe(catchError(this.handleError));
  }

  // Non-typed response extraction
  private extractResponseData(res: Response): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error("Some error occurred:", error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError(
      () => new Error("Something bad happened; please try again later.")
    );
  }
}
