import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PrimeNG } from 'primeng/config';
import { SelectedLanguage } from '../api/selected-language';
import { firstValueFrom } from 'rxjs';
import { BASE_URL } from '../api/base-url';

export type AppLocale = 'en-US' | 'el-GR'; // add your codes

export const appInitializer = async () => {
    await inject(LocaleService).load();
}

@Injectable({ providedIn: 'root' })
export class LocaleService {
    public selectedLanguage!: SelectedLanguage;
    public languages!: SelectedLanguage[];
    public localeId!: string;

    baseUrl = inject(BASE_URL);
    httpClient = inject(HttpClient);
    primeng = inject(PrimeNG);

    async load() {
        try {
            const { languages, current } = await firstValueFrom(this.httpClient.get<any>(`${this.baseUrl}api/account/getLanguages`));
            const cldr = await firstValueFrom(this.httpClient.get<any>(`/assets/i18n/primeng/${current.culture}.json`));

            this.primeng.setTranslation(cldr);
            this.setWorkingLanguage(current, languages);
        } catch (error) {
            console.error('Error fetching configuration:', error);
        }
    }
    
    public setWorkingLanguage(current: any, languages: any[]) {
        this.localeId = current.culture;
        this.selectedLanguage = current as SelectedLanguage;
        this.languages = languages as SelectedLanguage[];        

        // load(cldrKendo);
    }
}