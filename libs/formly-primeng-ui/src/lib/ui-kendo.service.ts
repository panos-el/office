import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DOCUMENT } from "@angular/common";


@Injectable({
    providedIn: 'root'
})
export class UiKendoService {
    document = inject(DOCUMENT);
    httpClient = inject(HttpClient);
    baseUrl!: string;

    constructor() {
        const baseHref = this.document.getElementsByTagName('base')[0].href;
        this.baseUrl = baseHref.endsWith("/") ? baseHref : "/";
    }

    loadOptions(controller: string, action: string) {
        const url = `${this.baseUrl}api/${controller}/${action}`;        
        return this.httpClient.get<any>(url);
    }
}
