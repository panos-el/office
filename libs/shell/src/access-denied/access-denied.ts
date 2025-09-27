import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@office/core';

@Component({
    selector: 'access-denied',
    templateUrl: './access-denied.html',
    imports: [CommonModule, RouterLink]
})
export class AccessDeniedComponent {
    router = inject(Router);
    authService = inject(AuthService);

    isAuthenticated = false;

    ngOnInit() {
        this.isAuthenticated = this.authService.isAuthUserLoggedIn();
    }

    goOffice() {
        this.router.navigateByUrl("/client");
    }

}
