import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppService } from '../services/app.service';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, MatIconModule, MatButtonModule],
  template: `
    <img src="/assets/images/hearts.png" alt="" class="w-full h-[120px] bg-gradient-to-b from-purple-700 to-transparent object-cover"/>

    <div class="absolute top-8 left-0 right-0 flex items-center justify-center">
      <img src="/assets/logo-white.svg" alt="Mahasal white color logo" class="w-32 mx-auto opacity-80" />
    </div>

    <!-- <a href="{{appService.pwaEndpoint}}" mat-flat-button class="m-4">
      ورود به وب اپ
    </a> -->

    <a routerLink="/" mat-button class="mx-4 mt-1 !justify-start">
      <mat-icon class="text-green-500"> home </mat-icon>
      <span class="text-black">
        صفحه اول
      </span>
    </a>  

    @for (item of appService.links; track $index) {
      <a routerLink="{{item.path}}" mat-button class="mx-4 mt-1 !justify-start">
        <mat-icon class="text-green-500">{{item.icon}}</mat-icon>
        <span class="text-black">
          {{ item.text }}
        </span>
      </a>        
    }

  `,
  host: {
    class: 'w-full h-screen flex flex-col relative'
  }
})
export class DrawerComponent {
  constructor(public appService: AppService) { }

}