import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';

import { DownloadCardComponent } from './components/download-card.component';
import { DrawerComponent } from './components/drawer.component';
import { HeaderComponent } from './components/header.component';

import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, DownloadCardComponent, DrawerComponent, MatSidenavModule],
  template: `
    <mat-sidenav-container class="h-full min-h-full">
      <mat-sidenav mode="over" opened="{{opened}}" (closed)="opened = false" class="max-w-[80vw]">
        <app-drawer (close)="opened = false"/>
      </mat-sidenav>

      <mat-sidenav-content class="h-full min-h-full">
        <app-header (open)="opened = true"/>

        <router-outlet />

        @if(appService.showDownloadApkAnyWhere) {
          <app-download-card />
        }
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  host: {
    class: ''
  }
})
export class AppComponent {
  public opened: boolean = false;

  constructor(
    @Inject(PLATFORM_ID)
    private platfromId: string,
    public appService: AppService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      const { inapp } = this.activatedRoute.snapshot.queryParams;

      if (inapp == 'yes' || inapp == 'true' || inapp == '1') {
        this.appService.showDownloadApkAnyWhere = false;
      }

      if (isPlatformBrowser(this.platfromId)) {
        if (window.localStorage.getItem('#mahasal/hide-download-card')) {
          this.appService.showDownloadApkAnyWhere = false;
        }
      }
    }, 0);
  }
}
