import { Component, ChangeDetectionStrategy, Type, OnInit } from '@angular/core';
import { FieldTypeConfig, FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FieldType, BaseFormlyFieldProps } from '../../form-field';
import { FormlyFieldSelectProps, FormlySelectModule } from '@ngx-formly/core/select';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { KENDO_MULTICOLUMNCOMBOBOX } from '@progress/kendo-angular-dropdowns';
import { groupBy, GroupDescriptor, GroupResult } from '@progress/kendo-data-query';

interface MulticolumncomboboxProps extends BaseFormlyFieldProps, FormlyFieldSelectProps {
    data?: any[] | GroupResult[];
    filterable?: boolean;
    primitive?: boolean;
    columns: Array<{ field: string; title?: string; width: number }>;
    groupBy?: GroupDescriptor[];
    showStickyHeader?: boolean;
    headerStyle?:  { [key: string]: any };
}

export interface FormlyMulticolumncomboboxFieldConfig extends FormlyFieldConfig<MulticolumncomboboxProps> {
    type: 'kendo-multicolumncombobox' | Type<FormlyFieldMulticolumncombobox>;
}

@Component({
    imports: [CommonModule, ReactiveFormsModule, FormlyModule, FormlySelectModule, KENDO_MULTICOLUMNCOMBOBOX],
    selector: 'formly-field-kendo-multicolumncombobox',
    template: `
        <kendo-multicolumncombobox
            [formControl]="formControl"
            [formlyAttributes]="field"
            [filterable]="props.filterable ?? false"
            [data]="props.options"
            [textField]="textField"
            [valueField]="valueField"
            [clearButton]="true"
            [valuePrimitive]="props.primitive || true"
            [showStickyHeader]="props.showStickyHeader || false "
            (filterChange)="handleFilterChange(field, $event)"
            (selectionChange)="props.change && props.change(field, $event)"
        >
            <kendo-combobox-column *ngFor="let c of props.columns" 
                [field]="c.field" [title]="c.title || c.field" [width]="c.width" [headerStyle]="props.headerStyle || {}">
            </kendo-combobox-column>
        </kendo-multicolumncombobox>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormlyFieldMulticolumncombobox extends FieldType<FieldTypeConfig<MulticolumncomboboxProps>> implements OnInit {
    get textField() {
        return this.props.labelProp as string;
    }
    get valueField() {
        return this.props.valueProp as string;
    }
    ngOnInit(): void {
        const data = (this.field.props.options as any[]).slice();
        this.field.props.data = (this.field.props.options as any[]).slice();
        this.field.props.options = this.autoGroupIfNeeded(data);
    }
    private groupDescriptors = (): GroupDescriptor[] => {
        const value = this.props.groupBy;
        if (Array.isArray(value)  && (value.length > 0)) {
            if (typeof (value[0] as any)?.field === 'string') 
                return value as GroupDescriptor[];
        }
        return [];
    }
    private autoGroupIfNeeded(data: any[]): any[] | GroupResult[] {
        const groupDescriptors = this.groupDescriptors();
        return groupDescriptors.length > 0 ? groupBy(data, groupDescriptors) : data;
    }
    private normalize = (v: any) =>
        (v ?? '')
            .toString()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, ''); // strip accents

    private anyStringFieldContains<T extends object>(item: T, query: string): boolean {
        const q = this.normalize(query);
        if (!q) return true;

        for (const [, value] of Object.entries(item)) {
            if (typeof value === 'string' && this.normalize(value).includes(q)) {
            return true;
            }
        }
        return false;
    }

    public handleFilterChange(field: FieldTypeConfig<MulticolumncomboboxProps>, searchTerm: string): void {
        const q = this.normalize(searchTerm);

        const data = (!q) 
            ? field.props.data as any[]
            : (field.props.data as any[]).filter(e => this.anyStringFieldContains(e, q))
        
        this.field.props.options = this.autoGroupIfNeeded(data);
    }
}
