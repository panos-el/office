import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BASE_URL } from '@office/core';
import { firstValueFrom } from 'rxjs';
import { PersistStateItem } from './api/persist-state-item';

@Injectable()
export class PersistStateService {
    baseUrl = inject(BASE_URL);
    httpClient = inject(HttpClient);

    private buildHttpParams(queryParams?: { [key: string]: any }): HttpParams {
        let params = new HttpParams();

        if (queryParams && Object.keys(queryParams).length > 0) {
            Object.keys(queryParams).forEach((key) => {
                if (queryParams[key] !== undefined) {
                    params = params.set(key, queryParams[key]);
                }
            });
        }
        return params;
    }

    private fetchJsonBodyGet(url: string, queryParams?: { [key: string]: any }): Promise<PersistStateItem[]> {

        return firstValueFrom(this.httpClient.get<PersistStateItem[]>(url, {
            params: this.buildHttpParams(queryParams)
        }));
    }

    private fetchJsonBodyPost<T>(url: string, body: any, queryParams?: { [key: string]: any }): Promise<T> {

        return firstValueFrom(this.httpClient.post<T>(url, body, {
            params: this.buildHttpParams(queryParams)
        }));
    }

    loadData(params: any) {
        const url = `${this.baseUrl}api/persistState/loadData`;

        return this.fetchJsonBodyGet(url, params);
    }

    createOrUpdate(body: any) {
        const url = `${this.baseUrl}api/persistState/createOrUpdate`;

        return this.fetchJsonBodyPost<any>(url, body);
    }

    remove(persistStateId: number) {
        const url = `${this.baseUrl}api/persistState/remove`;

        return this.fetchJsonBodyPost<any>(url, {}, { persistStateId });
    }

    select(persistStateId: number) {
        const url = `${this.baseUrl}api/persistState/select`;

        return this.fetchJsonBodyPost<any>(url, {}, { persistStateId });
    }

    primary(persistStateId: number) {
        const url = `${this.baseUrl}api/persistState/markAsPrimary`;

        return this.fetchJsonBodyPost<any>(url, {}, { persistStateId });
    }
}
