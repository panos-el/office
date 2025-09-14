import { Component, computed, inject, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, firstValueFrom, Subscription } from 'rxjs';
import { AppTopbar } from './app.topbar';
import { AppSidebar } from './app.sidebar';
import { LayoutService } from '../../layout/service/layout.service';
import { AppConfigurator } from './app.configurator';
import { AppBreadcrumb } from './app.breadcrumb';
import { AppFooter } from './app.footer';
import { BASE_URL } from '@office/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [CommonModule, AppTopbar, AppSidebar, RouterModule, AppConfigurator/* , AppBreadcrumb */, AppFooter],
    template: `<div class="layout-container" [ngClass]="containerClass()">
        <div app-topbar></div>
        <div app-sidebar></div>

        <div class="layout-content-wrapper">
            <!-- <nav app-breadcrumb></nav> -->
            <div class="layout-content">
                <router-outlet></router-outlet>
            </div>
            <div app-footer></div>
        </div>
        <app-configurator></app-configurator>
        <div class="layout-mask animate-fadein"></div>
    </div> `
})
export class AppLayout implements OnInit, OnDestroy {
    overlayMenuOpenSubscription: Subscription;

    menuOutsideClickListener: any;

    menuScrollListener: any;

    @ViewChild(AppSidebar) appSidebar!: AppSidebar;

    @ViewChild(AppTopbar) appTopbar!: AppTopbar;

    baseUrl = inject(BASE_URL);
    httpClient = inject(HttpClient);

    constructor(
        public layoutService: LayoutService,
        public renderer: Renderer2,
        public router: Router
    ) {
        this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
            if (!this.menuOutsideClickListener) {
                this.menuOutsideClickListener = this.renderer.listen('document', 'click', (event) => {
                    const isOutsideClicked = !(
                        this.appSidebar.appMenu.el.nativeElement.isSameNode(event.target) ||
                        this.appSidebar.appMenu.el.nativeElement.contains(event.target) ||
                        this.appTopbar.menuButton.nativeElement.isSameNode(event.target) ||
                        this.appTopbar.menuButton.nativeElement.contains(event.target) ||
                        this.appSidebar.el.nativeElement.isSameNode(event.target) ||
                        this.appSidebar.el.nativeElement.contains(event.target)
                    );

                    if (isOutsideClicked) {
                        this.hideMenu();
                    }
                });
            }

            if ((this.layoutService.isSlim() || this.layoutService.isSlimPlus()) && !this.menuScrollListener) {
                this.menuScrollListener = this.renderer.listen(this.appSidebar.appMenu.menuContainer.nativeElement, 'scroll', (event) => {
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
            const url = `${this.baseUrl}api/account/getMainMenu`;
    
            firstValueFrom(this.httpClient.get<any>(url)).then((result) => {
                this.layoutService.mainMenu.set(result.menu);
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
