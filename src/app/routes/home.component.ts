import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

import { PhoneComponent } from '../components/phone.component';
import { AppService } from '../services/app.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgOptimizedImage, PhoneComponent, MatIconModule],
  template: `
    <section class="grid grid-cols-1 md:grid-cols-2 container mx-auto my-10">
      <div class="flex flex-col items-center justify-center">
        <app-phone />
      </div>

      <div class="flex flex-col items-center md:items-start gap-2 px-4 py-10">
        <h3 class="font-extrabold text-3xl">
          شبکه اجتماعی من
        </h3>

        <br />

        <p class="text-gray-600"> به دنبال فرد خاصی هستی؟ </p>

        <p class="text-gray-600"> با ماه عسل همراه شو و دوست های ایده آل خودت رو پیدا کن! </p>

        <p class="text-gray-600"> همین حالا به جمع اجتماعی ما بپیوند </p>

        <div class="flex-1 my-10"></div>

        <div class="flex flex-nowrap items-center gap-2">
          <img ngSrc="/assets/images/qrcode.png" alt="Mahasal qr code" width="150" height="150" class="p-2 bg-white rounded-xl border hidden md:block" />

          <div class="flex flex-col gap-2">
            <div class="flex flex-wrap gap-2">
              <a href="/assets/mahasal.apk" download="mahasal.apk" class="flex flex-nowrap items-center gap-6 w-[222px] bg-white rounded-lg px-4 py-2 border transition-all active:scale-95">
                <div class="flex flex-col flex-1">
                  <span class="text-sm text-gray-600">دانلود</span>
                  <strong class="font-bold text-lg">مستقیم</strong>
                </div>
                
                <img ngSrc="/assets/icons/icon-72x72.png" alt="Mahasal app logo" width="36" height="36" />
              </a>

              <a href="{{appService.pwaEndpoint}}" class="flex flex-nowrap items-center gap-2 w-[222px] bg-white rounded-lg px-4 py-2 border transition-all active:scale-95">
                <span class="text-sm text-gray-600">ورود به</span>
                <strong class="font-bold text-lg">وب اپ</strong>

                <div class="flex-1"></div>

                <mat-icon>launch</mat-icon>
              </a>
            </div>

            <div class="flex flex-wrap gap-2">
              <a class="transition-all active:scale-95">
                <img src="/assets/images/cafebaazar-badge.png" alt="Cafebaazar download badge" class="h-[66px]" />
              </a>

              <a class="transition-all active:scale-95">
                <img src="/assets/images/google-play-badge.png" alt="Google play download badge" class="h-[66px]" />
              </a>
            </div>
          </div>
        </div>

        <div class="w-full h-[2px] my-4 bg-gradient-to-l from-gray-200 to-transparent"></div>

        <div class="flex flex-nowrap items-center gap-10">
          <img ngSrc="/assets/images/confetti.png" alt="confetti icon" width="46" height="46" />

          <h3 class="font-bold text-xl">کسب درآمد میلیونی با دعوت از دوستان</h3>
        </div>
      </div>
    </section>

    <section class="grid grid-cols-1 md:grid-cols-2 container mx-auto my-10">
      <div class="flex flex-col gap-2">
        <div class="flex flex-nowrap items-center gap-4">
          <svg width="36" height="36" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.4255 1.83301C6.36285 1.83301 2.25879 5.93706 2.25879 10.9997C2.25879 16.0623 6.36285 20.1663 11.4255 20.1663C16.4881 20.1663 20.5921 16.0623 20.5921 10.9997C20.5921 5.93706 16.4881 1.83301 11.4255 1.83301ZM10.7173 7.85462L8.87012 9.32557C8.09516 9.9427 7.70768 10.2513 7.78331 10.5958L7.78733 10.6129C7.8735 10.9553 8.36467 11.0869 9.347 11.3501C9.89288 11.4963 10.1658 11.5695 10.2939 11.7764L10.3005 11.7873C10.424 11.9967 10.3537 12.2589 10.2132 12.7834L10.1764 12.9204C9.78676 14.3746 9.59193 15.1017 9.96715 15.3365C10.3424 15.5713 10.9394 15.0959 12.1334 14.1451L13.9805 12.6742C14.7555 12.057 15.1429 11.7485 15.0673 11.404L15.0633 11.3869C14.9771 11.0445 14.486 10.9129 13.5036 10.6497C12.9577 10.5034 12.6848 10.4303 12.5568 10.2234L12.5502 10.2125C12.4267 10.0031 12.4969 9.74085 12.6375 9.21636L12.6742 9.07925C13.0638 7.6251 13.2587 6.89802 12.8834 6.66321C12.5082 6.4284 11.9112 6.90381 10.7173 7.85462Z" fill="#FF3C5E"></path></svg>
          <h3 class="font-bold text-2xl"> سایت ماه عسل </h3>
        </div>

        <p class="text-gray-700 p-4"> سایت ماه عسل یک شبکه اجتماعی آنلاین با محیطی جذاب و حرفه ای است ، که دارای امکاناتی مانند تماس صوتی ، تماس تصویری ، ارسال عکس ، ارسال موزیک ، ارسال فیلم و ارسال لوکیشن می باشد . این سایت به کسانی که قصد ازدواج دایم یا موقت دارند کمک میکند که همسر ایدآل خود را در کوتاه ترین زمان </p>
      </div>
    </section>

    <section class="grid grid-cols-1 md:grid-cols-2 container mx-auto my-10">
      <div></div>
      <div class="flex flex-col gap-2">
        <div class="flex flex-nowrap items-center gap-4">
          <svg width="36" height="36" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path _ngcontent-ng-c2715060265="" fill-rule="evenodd" clip-rule="evenodd" d="M3.71422 5.40628C3.36816 5.89945 3.36816 7.36535 3.36816 10.2972V11.741C3.36816 16.9104 7.25388 19.4191 9.69184 20.4843C10.3532 20.7732 10.6838 20.9177 11.6182 20.9177C12.5525 20.9177 12.8832 20.7732 13.5445 20.4843C15.9824 19.4191 19.8682 16.9104 19.8682 11.741V10.2972C19.8682 7.36535 19.8682 5.89945 19.5221 5.40628C19.1761 4.91312 17.798 4.44131 15.042 3.49769L14.5169 3.31791C13.0803 2.82602 12.3619 2.58008 11.6182 2.58008C10.8744 2.58008 10.1561 2.82602 8.71941 3.31791L8.19433 3.49769C5.43829 4.44131 4.06028 4.91312 3.71422 5.40628ZM14.4227 10.3731C14.6755 10.0898 14.6509 9.65512 14.3677 9.40218C14.0845 9.14924 13.6499 9.17384 13.397 9.45714L10.636 12.5502L9.83933 11.6577C9.58645 11.3744 9.15184 11.3498 8.86861 11.6027C8.58538 11.8556 8.56078 12.2903 8.81367 12.5736L10.1232 14.0407C10.2536 14.1868 10.4402 14.2703 10.636 14.2703C10.8319 14.2703 11.0184 14.1868 11.1489 14.0407L14.4227 10.3731Z" fill="#23BDAB"></path></svg>
          <h3 class="font-bold text-2xl">  چت سریع و بی حد و مرز  </h3>
        </div>

        <p class="text-gray-700 p-4">  نگران سرعت نباش، از چت سریع و روان با کاربران لذت ببر همچنین از تماس صوتی و تصویری بصورت رایگان همراه با ارسال عکس و لوکیشن لذت ببر  </p>
      </div>
    </section>

    <section class="grid grid-cols-1 md:grid-cols-2 container mx-auto my-10">
      <div class="flex flex-col gap-2">
        <div class="flex flex-nowrap items-center gap-4">
          <svg width="36" height="36" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path _ngcontent-ng-c2715060265="" d="M15.5837 10.9997C18.115 10.9997 20.167 8.94765 20.167 6.41634C20.167 3.88504 18.115 1.83301 15.5837 1.83301C13.0524 1.83301 11.0003 3.88504 11.0003 6.41634C11.0003 7.14953 11.1725 7.84251 11.4786 8.45706C11.5599 8.62037 11.587 8.80704 11.5398 8.98329L11.2669 10.0036C11.1483 10.4465 11.5535 10.8517 11.9964 10.7331L13.0167 10.4602C13.193 10.413 13.3796 10.4401 13.5429 10.5214C14.1575 10.8275 14.8505 10.9997 15.5837 10.9997Z" fill="#995BFF"></path><path _ngcontent-ng-c2715060265="" d="M7.36747 6.70649L7.96239 7.77251C8.49929 8.73453 8.28376 9.99655 7.43816 10.8421C7.43816 10.8422 7.43816 10.8421 7.43816 10.8422C7.43804 10.8423 6.41258 11.868 8.27215 13.7275C10.131 15.5864 11.1567 14.5624 11.1575 14.5615C11.1575 14.5615 11.1575 14.5615 11.1576 14.5615C12.0032 13.7159 13.2652 13.5004 14.2272 14.0373L15.2932 14.6322C16.7459 15.4429 16.9174 17.4801 15.6405 18.757C14.8733 19.5243 13.9334 20.1213 12.8943 20.1607C11.1452 20.227 8.17476 19.7843 5.19507 16.8046C2.21537 13.8249 1.7727 10.8545 1.83901 9.10533C1.8784 8.0663 2.47541 7.12638 3.24266 6.35913C4.51953 5.08226 6.55675 5.25382 7.36747 6.70649Z" fill="#995BFF"></path></svg>
          <h3 class="font-bold text-2xl">  بدون کاربران جعلی، متقلب و کلاه بردار   </h3>
        </div>

        <p class="text-gray-700 p-4">  ما به صورت سخت گیرانه به تخلفات کاربران رسیدگی می کنیم و از ایجاد هر گونه مزاحمت جلوگیری می کنیم   </p>
      </div>
    </section>
  `,
  host: {
    class: 'flex flex-col'
  },
})
export class HomeComponent {
  constructor(public appService: AppService) { }
}
