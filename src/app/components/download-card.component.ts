import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-download-card',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, MatButtonModule],
  template: `
    <div class="flex flex-nowrap items-center gap-4">
      <img ngSrc="/assets/icons/icon-72x72.png" alt="Mahasal app logo" width="24" height="24" />

      <h3 class="font-bold text-lg">دانلود اپلیکیشن ماه عسل</h3>
    </div>

    <p class="text-gray-700 text-sm"> اپلیکیشن ماه عسل یک شبکه اجتماعی آنلاین با محیطی جذاب و حرفه ای است ، که دارای امکاناتی مانند تماس صوتی ، تماس تصویری ، ارسال عکس ، ارسال موزیک ، ارسال فیلم و ارسال لوکیشن می باشد</p>

    <div class="grid xs:grid-cols-2 gap-4 mt-4">
      <button (click)="dontShowAgain()" mat-stroked-button>
        دیگر نشان نده
      </button>

      <a href="{{appService.apkDirectDownloadUrl}}" target="_blank" download="mahasal.apk" mat-flat-button color="primary">
        دانلود کنید
      </a>
    </div>
    
  `,
  host: {
    class: 'flex flex-col gap-2 rounded-xl border p-4 sticky bottom-4 mr-4 ml-4 xs:w-96 z-4 bg-white shadow transition-all hover:shadow-xl'
  }
})
export class DownloadCardComponent {
  constructor(
    public appService: AppService
  ) { }

  public dontShowAgain() {
    window.localStorage.setItem('#mahasal/hide-download-card', 'true');
    this.appService.showDownloadApkAnyWhere = false;
  }
}
