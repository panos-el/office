import { Component, HostListener, inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KENDO_DIALOGS } from '@progress/kendo-angular-dialog';
import { CldrIntlService, IntlService } from '@progress/kendo-angular-intl';
import { MessageService } from '@progress/kendo-angular-l10n';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { NgxLoadingBar } from '@ngx-loading-bar/core';
import { BASE_URL, CustomMessagesService, RefreshTokenService } from '@office/core';

@Component({
    imports: [RouterModule, KENDO_DIALOGS, NgxLoadingBar],
    selector: 'app-root',
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class App implements OnInit {
    @ViewChild(ToastContainerDirective, { static: true }) toastContainer!: ToastContainerDirective;

    baseUrl = inject(BASE_URL);
    messages = inject(MessageService);
    intlService = inject(IntlService);
    localeId = inject(LOCALE_ID);
    toastrService = inject(ToastrService);
    refreshTokenService = inject(RefreshTokenService);
    
    constructor() { 
        const intl = this.intlService as CldrIntlService;

        if (intl) {
            intl.localeId = this.localeId;
        } else {
            console.info("IntlService Error!");
        }

        // (this.intlService as CldrIntlService).localeId = this.localeId;
        (this.messages as CustomMessagesService).language = this.localeId;
    }
    
    ngOnInit(): void {
        this.toastrService.overlayContainer = this.toastContainer;
    }  

    @HostListener("window:unload")
    unloadHandler() {
        // Invalidate current tab as active RefreshToken timer
        this.refreshTokenService.invalidateCurrentTabId();
    }
}
