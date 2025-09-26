import { Component, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IntlModule } from '@progress/kendo-angular-intl';
import { KENDO_FILTER } from '@progress/kendo-angular-filter';
import { KENDO_GRID, KENDO_GRID_EXCEL_EXPORT, KENDO_GRID_PDF_EXPORT } from '@progress/kendo-angular-grid';
import { KENDO_BUTTONS } from '@progress/kendo-angular-buttons';
import { KENDO_INDICATORS } from '@progress/kendo-angular-indicators';
import { KENDO_ICONS } from '@progress/kendo-angular-icons';
import { KENDO_INPUTS } from '@progress/kendo-angular-inputs';

import { SVGIcon, fileExcelIcon, filePdfIcon, menuIcon, filterIcon, gearIcon, minusOutlineIcon, checkOutlineIcon, displayInlineFlexIcon, pencilIcon, saveIcon } from '@progress/kendo-svg-icons';

import { SearchBoxComponent } from '../../search-box/search-box';
import { StickyGridHeaderDirective } from '../../directives/sticky-grid-header.directive';
import { menuAnimation, stateAnimation } from '@office/core';
import { KendoGridToken } from '../api/kendo-grid-token';

import { KendoRemoteGridBase } from '../api/remote-grid-base';
import { PersistStateContextService } from '../services/persist-state-ctx.service';
import { PersistStateService } from '../services/persist-state.service';

@Component({
    selector: 'kendo-remote-grid',
    templateUrl: './kendo-remote-grid.html',
    providers: [{ provide: KendoGridToken, useExisting: forwardRef(() => KendoRemoteGridComponent) },
        PersistStateContextService, PersistStateService
    ],
    animations: [menuAnimation, stateAnimation],
    standalone: true,
    imports: [
        CommonModule,
        IntlModule,
        RouterModule,
        KENDO_GRID,
        KENDO_GRID_EXCEL_EXPORT,
        KENDO_GRID_PDF_EXPORT,
        KENDO_BUTTONS,
        KENDO_FILTER,
        KENDO_ICONS,
        KENDO_INPUTS,
        KENDO_INDICATORS,
        StickyGridHeaderDirective,
        SearchBoxComponent,
        // KendoRemoteGridBase // so inherited @Inputs work in AOT
    ]
})
export class KendoRemoteGridComponent extends KendoRemoteGridBase {
    // expose icons (template uses them)
    filePdfIcon: SVGIcon = filePdfIcon;
    fileExcelIcon: SVGIcon = fileExcelIcon;
    menuIcon: SVGIcon = menuIcon;
    filterIcon: SVGIcon = filterIcon;
    gearIcon: SVGIcon = gearIcon;
    checkOutlineIcon: SVGIcon = checkOutlineIcon;
    minusOutlineIcon: SVGIcon = minusOutlineIcon;
    displayInlineFlexIcon: SVGIcon = displayInlineFlexIcon;
    pencilIcon: SVGIcon = pencilIcon;
    saveIcon: SVGIcon = saveIcon;

}

