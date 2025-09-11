import { Routes } from '@angular/router';
import { CanActivateChildGuard, CanActivateEditFormGuard, CanActivateGuard } from '@office/core';
import { canDeactivateGuard, KendoEditFormContextService } from '@office/kendo-ui';
import { AppLayout } from './layout/components/app.layout';
import { AppHome } from './layout/components/app.home';

export * from './layout/service/layout.service';
export * from './layout/components/app.configurator';

export const CLIENT_ROUTES: Routes = [
    {
        path: '',
        component: AppLayout,
        canActivate: [CanActivateGuard],
        children: [
            {
                path: '',
                canActivateChild: [CanActivateChildGuard],
                children: [
                    {
                        path: "", 
                        component: AppHome,
                    },
                    {
                        path: 'currency',
                        loadComponent: () => import('./directory/currency/currency-list.component').then((c) => c.CurrencyListComponent)
                    },
                    {
                        path: 'currency/:id',
                        loadComponent: () => import('./directory/currency/currency-edit.component').then((c) => c.CurrencyEditComponent),
                        canActivate: [CanActivateEditFormGuard],
                        canDeactivate: [canDeactivateGuard],
                        providers: [KendoEditFormContextService]
                    },
                    // {
                    //     path: 'not-found',
                    //     loadComponent: () => import('./components/not-found/not-found.component').then((c) => c.NotfoundComponent)
                    // }
                ]
            }
        ]
    }
];