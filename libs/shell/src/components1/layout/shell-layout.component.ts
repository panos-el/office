import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientConfigurator } from '@suite/client';

@Component({
  selector: 'shell-layout',
  imports: [RouterOutlet, ClientConfigurator],
  templateUrl: './shell-layout.component.html'
})
export class ShellLayoutComponent {}
