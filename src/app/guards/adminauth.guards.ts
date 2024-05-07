import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { environment } from "../environment";

/**
 * If there is a token and a user in the local storage the function will
 * allow the specific route in app.module.ts to be taken, if false
 * it will inject a router to navigate to welcome.
 *
 */
export const adminAuthGuard: CanActivateFn = (route, state) => {
  if (
    JSON.parse(sessionStorage.getItem("loggedInUser")).email ==
    environment.admin_email
  ) {
    return true;
  } else {
    const router = inject(Router);
    return router.navigate(["welcome"]);
  }
};
