import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from "@angular/router";

@Injectable()
export class CustomRouterReuseStrategy extends RouteReuseStrategy {
  override shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }
  override store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
    const noop = () => { return null; };
    noop();
  }
  override shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }
  override retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return null;
  }
  override shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return false;
  }
}