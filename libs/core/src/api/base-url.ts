import { InjectionToken } from '@angular/core';

export const BASE_URL = new InjectionToken<string>('BASE_URL');

export function getBaseUrl(document: Document): string {
    const baseHref = document.getElementsByTagName('base')[0].href;
    return baseHref.endsWith("/") ? baseHref : "/";
}