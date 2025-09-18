import { inject } from "@angular/core";
import { CanDeactivateFn } from "@angular/router";
import { KendoEditFormContextService } from "../edit-form";

export const canDeactivateGuard: CanDeactivateFn<unknown> = () => {
    const context = inject(KendoEditFormContextService, { optional: true });

    return context?.canDeactivate() ?? true;
};
