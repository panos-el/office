import { DOCUMENT } from "@angular/common";
import { inject, LOCALE_ID } from "@angular/core";
import { API_CONFIG, ApiConfig } from "./api/api.config";
import { BASE_URL, getBaseUrl } from "./api/base-url";
import { MessageService } from "@progress/kendo-angular-l10n";

import { CustomMessagesService } from './services/custom-messages.service';
import { LocaleService } from "./services/locale.service";

export const APP_PROVIDERS = [
    { provide: API_CONFIG, useValue: ApiConfig },
    { provide: BASE_URL, useFactory: getBaseUrl, deps: [DOCUMENT] },
    { provide: MessageService, useClass: CustomMessagesService }
];

export const AFTER_APP_INITIALIZER = [
    // { provide: MessageService, useClass: CustomMessagesService },
    { provide: LOCALE_ID, useFactory: () => inject(LocaleService).localeId },
];
