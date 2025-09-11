import { Component, computed, ElementRef, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClientMenuitem } from './client.menuitem';
import { LayoutService } from '../services/layout.service';

@Component({
    selector: '[client-menu]',
    standalone: true,
    imports: [CommonModule, ClientMenuitem, RouterModule],
    template: `
        <ul class="layout-menu" #menuContainer>
            <ng-container *ngFor="let item of layoutMenu(); let i = index">
                <li client-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
                <li *ngIf="item.separator" class="menu-separator"></li>
            </ng-container>
        </ul> `
})
export class ClientMenu {
    el = inject(ElementRef);
    layoutService = inject(LayoutService);

    @ViewChild('menuContainer') menuContainer!: ElementRef;

    layoutMenu = computed(() => this.layoutService.layoutMenu());

    constructor() {
        // effect(() => console.log(this.layoutMenu()));
    }
}
