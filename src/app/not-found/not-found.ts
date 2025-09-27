import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.html',
    standalone: true,
    imports: [RouterModule, ButtonModule],
})
export class Notfound { }
