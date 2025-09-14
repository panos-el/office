import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldArrayType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { KENDO_TABSTRIP } from '@progress/kendo-angular-layout';
import { BaseFormlyFieldProps } from '../../form-field';

interface LocaleTabsProps extends BaseFormlyFieldProps {
    images: string[];
    titles: string[];
}

@Component({
    imports: [CommonModule, ReactiveFormsModule, FormlyModule,KENDO_TABSTRIP],
    selector: 'formly-field-kendo-locale-tabs',
    template: `
        <kendo-tabstrip>
            <kendo-tabstrip-tab *ngFor="let tab of field.fieldGroup; let i = index;" [selected]="i === selected">
                <ng-template kendoTabTitle>
                    <img class="tab-image" [src]="props.images[i]" />
                    <span>{{ props.titles[i] }}</span>
                </ng-template>
                <ng-template kendoTabContent>
                    <formly-field [field]="tab"></formly-field>
                </ng-template>
            </kendo-tabstrip-tab>
        </kendo-tabstrip>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldLocaleTabs extends FieldArrayType<FieldTypeConfig<LocaleTabsProps>> {
    selected = 0;
}
