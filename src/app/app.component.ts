import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';

import { HeaderComponent } from './components/header.component';
import { DrawerComponent } from './components/drawer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, DrawerComponent, MatSidenavModule],
  template: `
    <mat-sidenav-container class="h-full min-h-full">
      <mat-sidenav mode="over" opened="{{opened}}" (closed)="opened = false">
        <app-drawer />
      </mat-sidenav>

      <mat-sidenav-content class="h-full min-h-full">
        <app-header (open)="opened = true"/>

        <router-outlet />
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  host: {
    class: ''
  }
})
export class AppComponent {
  public opened: boolean = false;
}
