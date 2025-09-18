import { Routes } from '@angular/router';
import { CanActivateChildGuard, CanActivateGuard } from '@office/core';
import { AppLayout } from './layout/components/app.layout';
import { AppHome } from './layout/components/app.home';
import { CUSTOMER_ROLE_ROUTES } from './customers/customer-role/customer-role-routing';
import { ACTIVITY_LOG_ROUTES } from './logging/activity-log/activity-log-routing';
import { CURRENCY_ROUTES } from './directory/currency/currency-routing';
import { ACTIVITY_LOG_TYPE_ROUTES } from './logging/activity-log-type/activity-log-type-routing';
import { LOG_ROUTES } from './logging/log/log-routing';
import { LANGUAGE_ROUTES } from './localization/language/language-routing';
import { COUNTRY_ROUTES } from './directory/country/country-routing';
import { PERSIST_STATE_ROUTES } from './common/persist-state/persist-state-routing';
import { ONLINE_ROUTES } from './customers/online/online-routing';
import { EMAIL_ACCOUNT_ROUTES } from './messages/email-account/email-account-routing';
import { QUEUED_EMAIL_ROUTES } from './messages/queued-email/queued-email-routing';
import { MESSAGE_TEMPLATE_ROUTES } from './messages/message-template/message-template-routing';
import { PERMISSION_RECORD_ROUTES } from './security/permission-record/permission-record-routing';
import { SCHEDULE_TASK_ROUTES } from './tasks/schedule-task/schedule-task-routing';
import { STORE_ROUTES } from './stores/store/store-routing';

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
                    ...LANGUAGE_ROUTES,
                    ...COUNTRY_ROUTES,
                    ...PERSIST_STATE_ROUTES,
                    ...ONLINE_ROUTES,
                    ...EMAIL_ACCOUNT_ROUTES,
                    ...QUEUED_EMAIL_ROUTES,
                    ...MESSAGE_TEMPLATE_ROUTES,
                    ...PERMISSION_RECORD_ROUTES,
                    ...SCHEDULE_TASK_ROUTES,
                    ...STORE_ROUTES
                    // {
                    //     path: 'not-found',
                    //     loadComponent: () => import('./components/not-found/not-found.component').then((c) => c.NotfoundComponent)
                    // }
                ]
            }
        ]
    }
];