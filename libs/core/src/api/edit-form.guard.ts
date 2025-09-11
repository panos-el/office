import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";

export const CanActivateEditFormGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const raw = route.paramMap.get('id');
    const isValid = raw !== null && /^\d+$/.test(raw); // allow "0"
    
    if (isValid) {
        return true;
    } else {
        const path   = state.url.split(/[?#]/)[0].replace(/\/+$/,'');
        const parent = path.substring(0, path.lastIndexOf('/')) || '/';

        inject(Router).navigate([parent], { replaceUrl: true });
        
        return false;
    }
};