declare var google: any;
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  signOut() {
    google.accounts.id.disableAutoSelect();
    localStorage.removeItem('loggedInUser');
  }
}
