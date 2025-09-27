import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '@office/core';
import { SelectLanguage } from '../components/select-language';

@Component({
    selector: 'app-landing',
    imports: [CommonModule, RouterLink, ButtonModule, SelectButtonModule, SelectLanguage],
    templateUrl: "./landing.html"
})
export class Landing implements OnInit {
    authService = inject(AuthService);

    loginIn: boolean = false;

    ngOnInit(): void {
        this.loginIn = this.authService.isAuthUserLoggedIn();
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
