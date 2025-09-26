import { Routes } from '@angular/router';
import { COMPANY_SETTINGS_ROUTES } from './company/company-settings-routing';
import { CUSTOMER_SETTINGS_ROUTES } from './customer/customer-settings-routing';
import { GDPR_SETTINGS_ROUTES } from './gdpr/gdpr-settings-routing';
import { ROBOTS_TXT_SETTINGS_ROUTES } from './robot-txt/robots-txt-settings-routing';
import { PDF_SETTINGS_ROUTES } from './pdf/pdf-settings-routing';
import { CAPTCHA_SETTINGS_ROUTES } from './captcha/captcha-settings-routing';

export const SETTINGS_ROUTES: Routes = [    
    ...COMPANY_SETTINGS_ROUTES,
    ...CUSTOMER_SETTINGS_ROUTES,
    ...GDPR_SETTINGS_ROUTES,
    ...ROBOTS_TXT_SETTINGS_ROUTES,
    ...PDF_SETTINGS_ROUTES,
    ...CAPTCHA_SETTINGS_ROUTES,
];