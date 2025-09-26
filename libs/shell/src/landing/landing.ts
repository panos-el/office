import { AppConfigurator } from '@office/client';
import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, LocaleService } from '@office/core';

@Component({
    selector: 'app-landing',
    imports: [CommonModule, FormsModule, RouterLink, AppConfigurator, ButtonModule, SelectButtonModule],
    templateUrl: "./landing.html"
})
export class Landing implements OnInit {
    authService = inject(AuthService);
    localeService = inject(LocaleService);

    loginIn: boolean = false;
    languageId!: number;
    languages: any[] = [];

    ngOnInit(): void {
        this.languages = this.localeService.languages;
        this.loginIn = this.authService.isAuthUserLoggedIn();
    }

    changeLanguage(item: any) {
        this.localeService.setLanguage(item.value);
    }

    scrollToElement($element: any): void {
        setTimeout(() => {
            $element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
        }, 200);
    }
}
