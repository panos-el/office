import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppConfigurator } from '@office/client';

@Component({
  selector: 'shell-layout',
  imports: [RouterOutlet, AppConfigurator],
  templateUrl: './shell-layout.html'
})
export class ShellLayout {}
