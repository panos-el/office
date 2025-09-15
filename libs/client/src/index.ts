import { Routes } from '@angular/router';
import { CanActivateChildGuard, CanActivateGuard } from '@office/core';
import { AppLayout } from './layout/components/app.layout';
import { AppHome } from './layout/components/app.home';
import { CUSTOMER_ROLE_ROUTES } from './customers/customer-role/customer-role-routing';
import { ACTIVITY_LOG_ROUTES } from './logging/activity-log/activity-log-routing';
import { CURRENCY_ROUTES } from './directory/currency/currency-routing';
import { ACTIVITY_LOG_TYPE_ROUTES } from './logging/activity-log-type/activity-log-type-routing';
import { LOG_ROUTES } from './logging/log/log-routing';

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
                    ...CURRENCY_ROUTES,
                    ...CUSTOMER_ROLE_ROUTES,
                    ...ACTIVITY_LOG_ROUTES,
                    ...ACTIVITY_LOG_TYPE_ROUTES,
                    ...LOG_ROUTES,
                    // {
                    //     path: 'not-found',
                    //     loadComponent: () => import('./components/not-found/not-found.component').then((c) => c.NotfoundComponent)
                    // }
                ]
            }
        ]
    }
];