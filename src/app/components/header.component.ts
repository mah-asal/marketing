import { NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, MatButtonModule, MatIconModule],
  template: `
      <button mat-icon-button class="absolute md:!hidden" (click)="open.emit()">
        <mat-icon> menu </mat-icon>
      </button>

      <div class="flex-1 md:hidden"></div>

      <a routerLink="/" title="Mahasal home page">
        <img ngSrc="/assets/logo.svg" alt="Mahasal logo" width="100" height="42" />
      </a>

      <div class="flex-1"></div>

      @for (item of appService.links; track $index) {
        <a routerLink="{{item.path}}" mat-button class="!hidden md:!inline-flex">
          {{ item.text }}
        </a>        
      }

      @if(appService.pwaVisabable) {
        <a href="{{appService.pwaEndpoint}}" mat-flat-button class="!hidden md:!inline-flex">
          ورود به وب اپ
        </a>
      }
  `,
  host: {
    class: 'min-h-[64px] flex flex-nowrap items-center gap-1 container mx-auto px-4'
  }
})
export class HeaderComponent {
  @Output()
  public open: EventEmitter<void> = new EventEmitter();

  constructor(public appService: AppService) { }
}


