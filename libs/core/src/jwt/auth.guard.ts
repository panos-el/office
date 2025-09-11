import { Injectable, inject } from "@angular/core";
import { 
    ActivatedRouteSnapshot, CanMatchFn, Data, Route, Router, 
    RouterStateSnapshot, CanActivateChildFn, CanActivateFn } from "@angular/router";

import { AuthGuardPermission } from "../api/auth-guard-permission";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  private permissionObjectKey = "permission";
  authService = inject(AuthService);
  router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const permissionData = route.data[this.permissionObjectKey] as AuthGuardPermission;
    const returnUrl = state.url;
    return this.hasAuthUserAccessToThisRoute(permissionData, returnUrl);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const permissionData = childRoute.data[this.permissionObjectKey] as AuthGuardPermission;
    const returnUrl = state.url;
    return this.hasAuthUserAccessToThisRoute(permissionData, returnUrl);
  }

  canMatch(route: Route): boolean {
    if (route.data) {
      const permissionData = route.data[this.permissionObjectKey] as AuthGuardPermission;
      const returnUrl = `/${route.path}`;
      return this.hasAuthUserAccessToThisRoute(permissionData, returnUrl);
    } else {
      return true;
    }
  }

  private hasAuthUserAccessToThisRoute(permissionData: Data, returnUrl: string): boolean {
    if (!this.authService.isAuthUserLoggedIn()) {
      this.showAccessDenied(returnUrl);
      return false;
    }

    if (!permissionData) {
      return true;
    }

    if (Array.isArray(permissionData["deniedRoles"]) && Array.isArray(permissionData["permittedRoles"])) {
      throw new Error("Don't set both 'deniedRoles' and 'permittedRoles' in route data.");
    }

    if (Array.isArray(permissionData["permittedRoles"])) {
      const isInRole = this.authService.isAuthUserInRoles(permissionData["permittedRoles"]);
      if (isInRole) {
        return true;
      }

      this.showAccessDenied(returnUrl);
      return false;
    }

    if (Array.isArray(permissionData["deniedRoles"])) {
      const isInRole = this.authService.isAuthUserInRoles(permissionData["deniedRoles"]);
      if (!isInRole) {
        return true;
      }

      this.showAccessDenied(returnUrl);
      return false;
    }

    return true;
  }

  private showAccessDenied(returnUrl: string) {
    this.router.navigate(["/accessDenied"], { queryParams: { returnUrl: returnUrl } });
  }
}

export const CanActivateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  return inject(AuthGuard).canActivate(route, state);
};

export const CanActivateChildGuard: CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  return inject(AuthGuard).canActivateChild(route, state);
};

export const CanMatchGuard: CanMatchFn = (
  route: Route
) => {
  return inject(AuthGuard).canMatch(route);
};