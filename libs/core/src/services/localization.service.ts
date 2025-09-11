import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '@progress/kendo-angular-l10n';

import { firstValueFrom } from 'rxjs';
import { BASE_URL } from '../api/base-url';
import { CustomMessagesService } from './custom-messages.service';

@Injectable({
    providedIn: 'root',
})
export class LocalizationService {
    private customMsgService!: CustomMessagesService;
    baseUrl = inject(BASE_URL);
    httpClient = inject(HttpClient);
    messages = inject(MessageService);

    constructor() {        
        this.customMsgService = this.messages as CustomMessagesService;
    }

    public setLanguage(langId: any): void {
        const url = `${this.baseUrl}api/common/setLanguage?langId=${langId}`;

        firstValueFrom(this.httpClient.get(url))
            .then(_ => {
                window.location.reload();
            })
            .catch(err => {
                console.error(`Failed to setLanguage(). Make sure ${url} is accessible.`, langId);
                return Promise.reject(err);
            });
    }

    public translate(key: string): string {
        return this.customMsgService.translate(key);
    }

    private isDefined(value: any): boolean {
        return typeof value !== 'undefined' && value !== null;
    }

    public translateWithParams(key: string, ...args: any[]): any {
        if (!key || !key.length) {
            return key;
        }

        const value = this.customMsgService.translate(key);

        if (this.isDefined(args[0]) && args.length) {
            return value.replace(/{(\d+)}/g, (_, index) => args[index] || '')
        }

        return value;
    }
}