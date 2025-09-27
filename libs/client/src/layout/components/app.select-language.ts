import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocaleService } from '@office/core';

@Component({
    selector: 'app-select-language',
    imports: [CommonModule, FormsModule],
    template: `
        <ul class="list-none p-0 m-0">
            <li *ngFor="let lang of languages; let i = index;">
                <a class="py-2 px-3 flex gap-2 items-center cursor-pointer text-color hover:text-primary" (click)="changeLanguage(lang.id)">
                    <img [src]="lang.flag" alt="flag" />
                    <span>{{lang.name}}</span>
                </a>
            </li>
        </ul>
    `
})
export class AppSelectLanguage implements OnInit {
    localeService = inject(LocaleService);

    languages: any[] = [];

    ngOnInit(): void {
        this.languages = this.localeService.languages;
    }

    changeLanguage(value: number) {
        this.localeService.setLanguage(value);
    }
}
