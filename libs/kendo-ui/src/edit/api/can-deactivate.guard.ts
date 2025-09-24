import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';

export interface CanLeave {
    canDeactivate?: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class CanDeactivateService {
    public form!: CanLeave;
}

export const canDeactivateGuard: CanDeactivateFn<unknown> = () => {
    const service = inject(CanDeactivateService);
    return service.form?.canDeactivate ? service.form.canDeactivate() : true;
};
