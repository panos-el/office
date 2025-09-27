import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocaleService } from '@office/core';
import { SelectButton } from 'primeng/selectbutton';

@Component({
    selector: 'select-language',
    imports: [FormsModule, SelectButton],
    template: `
        <p-selectButton optionValue="id" [options]="languages" [ngModel]="languageId" (ngModelChange)="changeLanguage($event)">
            <ng-template #item let-item>
                <img [src]="item.flag" alt="image" />
            </ng-template>
        </p-selectButton>
    `,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'p-select-language'
    },
    styles: [
        `
            .p-select-language .p-togglebutton {
                background-color: transparent;
                border-color: transparent;
            }
            .p-select-language .p-togglebutton .p-togglebutton-content {
                background-color: transparent;
            }
            .p-select-language .p-togglebutton.p-togglebutton-checked {
                background-color: transparent;
                border-color: transparent;
            }
            .p-select-language .p-togglebutton.p-togglebutton-checked .p-togglebutton-content {
                border: 1px solid var(--p-togglebutton-checked-border-color);
            }
        `
    ]
})
export class SelectLanguage implements OnInit {
    localeService = inject(LocaleService);

    languageId!: number;
    languages: any[] = [];

    ngOnInit(): void {
        this.languageId = this.localeService.selectedLanguage.id;
        this.languages = this.localeService.languages;
    }

    changeLanguage(value: number) {
        if (value) this.localeService.setLanguage(value);
    }
}
