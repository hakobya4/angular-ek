import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

/**
 * If there is a token and a user in the local storage the function will
 * allow the specific route in app.module.ts to be taken, if false
 * it will inject a router to navigate to welcome.
 *
 */
export const authGuard: CanActivateFn = (route, state) => {
  if (
    sessionStorage.getItem("loggedInUser") ||
    (localStorage.getItem("user") && localStorage.getItem("username"))
  ) {
    return true;
  } else {
    const router = inject(Router);
    return router.navigate(["welcome"]);
  }
};
