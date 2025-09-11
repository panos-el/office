import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AuthService, BASE_URL, Credentials, LocalizationService, PrimeNgImportModule } from '@suite/core';
import { distinctUntilChanged, firstValueFrom, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'login',
    imports: [CommonModule, FormsModule, RouterModule, PrimeNgImportModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {

    model!: Credentials;
    error = "";
    returnUrl: string | null = null;
    subscription: Subscription | null = null;
    initialize = false;

    sighInTitleLabel!: string;
    usernameLabel!: string;
    emailLabel!: string;
    passwordLabel!: string;
    rememberMeLabel!: string;
    welcomeLabel!: string;
    loginLabel!: string;

    constructor(
        @Inject(BASE_URL) private baseUrl: string,
        private httpClient: HttpClient,
        private authService: AuthService,
        private localizationService: LocalizationService,
        private router: Router,
        private route: ActivatedRoute) { }

    rememberMe!: boolean;

    ngOnInit() {

        this.sighInTitleLabel = this.localizationService.translate('pages.login.sighInTitle');
        this.usernameLabel = this.localizationService.translate('pages.login.username');
        this.emailLabel = this.localizationService.translate('pages.login.email');
        this.passwordLabel = this.localizationService.translate('pages.login.password');
        this.rememberMeLabel = this.localizationService.translate('pages.login.rememberMe');
        this.welcomeLabel = this.localizationService.translate('pages.login.welcome');
        this.loginLabel = this.localizationService.translate('pages.login.login');

        this.subscription = this.authService.authStatus$
            .pipe(
                distinctUntilChanged() // only emit when the value actually changes
            )
            .subscribe(status => {
                if (!this.initialize && !status) {
                    firstValueFrom(
                        this.httpClient.get<Credentials>(`${this.baseUrl}api/account/login`)
                    ).then((result) => {
                        this.model = result;
                        this.initialize = true;
                    });
                }
            });

        // reset the login status ReCaptcha
        this.authService.logout(false);

        // get the return url from route parameters
        this.returnUrl = this.route.snapshot.queryParams["returnUrl"];
    }

    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    reCaptcha() {
        firstValueFrom(this.httpClient.get<string>(`${this.baseUrl}api/account/reCaptcha`)).then((image) => {
            this.model.captchaImage = image;
            this.model.captchaCode = undefined;
        });
    }

    submit() {
        this.authService.login(this.model).subscribe({
            next: (isLoggedIn: boolean) => {
                if (isLoggedIn) {
                    if (this.returnUrl) {
                        this.router.navigate([this.returnUrl]);
                    } else {
                        this.router.navigate(["/client"]);
                    }
                }
            },
            error: (error: HttpErrorResponse) => {
                throw error;
            },
            complete: () => {
                if(this.model.captchaEnabled)
                    this.reCaptcha();
            }
        });
    }
}
