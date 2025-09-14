import { ApplicationConfig, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling, withRouterConfig } from '@angular/router';

import { provideLoadingBar } from '@ngx-loading-bar/core';
import { provideFormlyCore } from '@ngx-formly/core';
import { withFormlyKendo } from '@office/formly-kendo-ui';
import { provideToastr } from 'ngx-toastr';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { appRoutes } from './app.routes';

import { AFTER_APP_INITIALIZER, APP_PROVIDERS, appInitializer, authInterceptor, xsrfInterceptor } from '@office/core';
import { registerLocaleData } from '@angular/common';

import '@progress/kendo-angular-intl/locales/en/all';
import '@progress/kendo-angular-intl/locales/el/all';

// load the data for Greek and U.S. English
import localeEl from '@angular/common/locales/el';
import localeEn from '@angular/common/locales/en';

registerLocaleData(localeEl, 'el-GR');
registerLocaleData(localeEn, 'en-US');

export const appConfig: ApplicationConfig = {
    providers: [
        ...APP_PROVIDERS,
        // importProvidersFrom([KendoIntlModule]),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(
            appRoutes,
            withRouterConfig({ onSameUrlNavigation: 'reload' }),
            withInMemoryScrolling({
                anchorScrolling: 'enabled',
                scrollPositionRestoration: 'enabled'
            }),
            withEnabledBlockingInitialNavigation()
        ),
        // { provide: RouteReuseStrategy, useClass: CustomRouterReuseStrategy },
        provideAnimationsAsync(),
        provideToastr({
            closeButton: true,
            progressBar: true,
            positionClass: 'toast-bottom-right'
        }), // Toastr providers
        providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } } }),
        provideHttpClient(withInterceptors([authInterceptor, xsrfInterceptor])),
        provideLoadingBar({ latencyThreshold: 0 }), // after provideHttpClient
        provideAppInitializer(appInitializer), // provideHttpClient
        ...AFTER_APP_INITIALIZER,
        provideFormlyCore([...withFormlyKendo()])
    ]
};

export const appConfig2: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(appRoutes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
        provideHttpClient(withFetch()),
        provideAnimationsAsync(),
        providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } } })
    ]
};
