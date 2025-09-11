import { Component, computed, OnDestroy, Renderer2, ViewChild, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, firstValueFrom, Subscription } from 'rxjs';
import { ClientTopbar } from './client.topbar';
import { ClientSidebar } from './client.sidebar';
import { LayoutService } from '../services/layout.service';
import { ClientConfigurator } from './client.configurator';
import { ClientFooter } from './client.footer';
import { AuthService, BASE_URL, LocalizationService } from '@suite/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'client-layout',
    standalone: true,
    imports: [CommonModule, ClientTopbar, ClientSidebar, RouterModule, ClientConfigurator, ClientFooter],
    template: `<div class="layout-container" [ngClass]="containerClass()">
        <div client-topbar></div>
        <div client-sidebar></div>

        <div class="layout-content-wrapper">
            <div class="layout-content">
                <router-outlet></router-outlet>
            </div>
            <div client-footer></div>
        </div>
        <client-configurator></client-configurator>
        <div class="layout-mask animate-fadein"></div>
    </div> `
})
export class ClientLayout implements OnInit, OnDestroy {
    overlayMenuOpenSubscription: Subscription;

    menuOutsideClickListener: any;

    menuScrollListener: any;

    @ViewChild(ClientSidebar) appSidebar!: ClientSidebar;

    @ViewChild(ClientTopbar) appTopbar!: ClientTopbar;

    layoutService = inject(LayoutService);
    renderer = inject(Renderer2);
    router = inject(Router);
    localizationService = inject(LocalizationService);
    authService = inject(AuthService);
    baseUrl = inject(BASE_URL);
    httpClient = inject(HttpClient);
    logoutLabel!: string;
    languagesLabel!: string;
    usernameLabel!: string;

    constructor(
    ) {
        this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
            if (!this.menuOutsideClickListener) {
                this.menuOutsideClickListener = this.renderer.listen('document', 'click', (event) => {
                    const isOutsideClicked = !(
                        this.appSidebar.appMenu.el.nativeElement.isSameNode(event.target) ||
                        this.appSidebar.appMenu.el.nativeElement.contains(event.target) ||
                        this.appTopbar.menuButton.nativeElement.isSameNode(event.target) ||
                        this.appTopbar.menuButton.nativeElement.contains(event.target)
                    );

                    if (isOutsideClicked) {
                        this.hideMenu();
                    }
                });
            }

            if ((this.layoutService.isSlim() || this.layoutService.isSlimPlus()) && !this.menuScrollListener) {
                this.menuScrollListener = this.renderer.listen(this.appSidebar.appMenu.menuContainer.nativeElement, 'scroll', () => {
                    if (this.layoutService.isDesktop()) {
                        this.hideMenu();
                    }
                });
            }

            if (this.layoutService.layoutState().staticMenuMobileActive) {
                this.blockBodyScroll();
            }
        });

        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
            this.hideMenu();
        });
    }

    ngOnInit(): void {
        this.logoutLabel = this.localizationService.translate("common.logout");
        this.languagesLabel = this.localizationService.translate("common.languages");
        this.usernameLabel = this.authService.getAuthUser()?.userName as string;

        const url = `${this.baseUrl}api/account/getMainMenu`;

        firstValueFrom(this.httpClient.get<any>(url)).then((result) => {
            this.layoutService.layoutMenu.set(result.menu);

            // firstValueFrom(this.httpClient.get<any>(`${this.baseUrl}/client/getLanguages`)).then((result) => {
            //     this.languages = result;
            // });
        });
    }

    hideMenu() {
        this.layoutService.layoutState.update((prev) => ({ ...prev, overlayMenuActive: false, staticMenuMobileActive: false, menuHoverActive: false }));
        this.layoutService.reset();
        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
            this.menuOutsideClickListener = null;
        }

        this.unblockBodyScroll();
    }

    blockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        } else {
            document.body.className += ' blocked-scroll';
        }
    }

    unblockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        } else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    containerClass = computed(() => {
        const layoutConfig = this.layoutService.layoutConfig();
        const layoutState = this.layoutService.layoutState();

        return {
            'layout-container': true,
            ['layout-topbar-' + layoutConfig.topbarTheme]: true,
            ['layout-menu-' + layoutConfig.menuTheme]: true,
            ['layout-menu-profile-' + layoutConfig.menuProfilePosition]: true,
            'layout-overlay': layoutConfig.menuMode === 'overlay',
            'layout-static': layoutConfig.menuMode === 'static',
            'layout-slim': layoutConfig.menuMode === 'slim',
            'layout-slim-plus': layoutConfig.menuMode === 'slim-plus',
            'layout-horizontal': layoutConfig.menuMode === 'horizontal',
            'layout-reveal': layoutConfig.menuMode === 'reveal',
            'layout-drawer': layoutConfig.menuMode === 'drawer',
            'layout-sidebar-dark': layoutConfig.colorScheme === 'dark',
            'layout-static-inactive': layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === 'static',
            'layout-overlay-active': layoutState.overlayMenuActive,
            'layout-mobile-active': layoutState.staticMenuMobileActive,
            'layout-menu-profile-active': layoutState.rightMenuActive,
            'layout-sidebar-active': layoutState.sidebarActive,
            'layout-sidebar-anchored': layoutState.anchored
        };
    });

    ngOnDestroy() {
        if (this.overlayMenuOpenSubscription) {
            this.overlayMenuOpenSubscription.unsubscribe();
        }

        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
        }
    }
}
