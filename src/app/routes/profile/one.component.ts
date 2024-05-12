import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HttpService } from '../../services/http.service';
import { AppService } from '../../services/app.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-one',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, RouterLink],
  template: `
    @if(error) {
      <div class="flex flex-col items-center justify-center text-center h-[50vh] col-span-1 md:col-span-4 lg:col-span-5 xl:col-span-6">
        <strong class="font-bold text-2xl m-2">
          @switch (error) {
            @case ("UNSUBSCRIBED") {
              این کاربر از عضویت خود انصراف داده است اما احتمال بازگشت مجدد او وجود دارد
            }
            @case ("SUSSPENDED") {
              این کاربر به دلیل نقض قوانین مسدود شده است
            }
            @case ("SUSSPENDED_BY_ADMIN") {
              این کاربر به دلیل نقض قوانین توسط مدیریت مسدود شده است
            }
            @case ("BLOCKED_BY_ADMIN") {
              این کاربر توسط مدیریت بلاک شده است
            }
            @case ("LEAVE_FOR_EVER") {
              این کاربر حساب کاربری خودش را حذف کرده است
            }
          }
        </strong>

        <a routerLink="/profile/search" mat-stroked-button class="mt-10">
          <mat-icon>
            search
          </mat-icon>

          <span>
            بازگشت به جستجو
          </span>
        </a>
      </div>
    }

    @if(data) {
      <img src="{{data['avatar']}}" alt="{{data['fullname']}}" class="rounded-full md:rounded-xl md:row-span-2 w-32 h-32 md:w-full md:h-80 object-cover object-top mx-auto" />

      <div class="flex flex-col gap-4 md:col-span-3 lg:col-span-4 xl:col-span-5">
        <div class="flex flex-nowrap items-center gap-1">
          <h3 class="font-bold text-3xl">{{data['fullname']}}</h3>

          @if(data['verified']) {
            <mat-icon class="text-blue-500">verified</mat-icon>
          }

          <div class="flex-1"></div>

          <div class="flex flex-nowrap items-center gap-2 bg-white/60 backdrop-blur px-2 py-1 text-xs rounded-full">
            @if(data['seen'] == 'online') {
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              <span>آنلاین</span>
            }
            @if(data['seen'] == 'offline') {
              <div class="w-2 h-2 rounded-full bg-red-500"></div>
              <span>آفلاین</span>
            }
            @if(data['seen'] == 'recently') {
              <div class="w-2 h-2 rounded-full bg-amber-500"></div>
              <span>اخیرا آنلاین</span>
            }
          </div>
        </div>

        <div class="grid grid-cols-4 gap-4">
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 col-span-4 xl:col-span-3">
            <div class="bg-white p-4 h-fit flex flex-col gap-2 justify-end rounded-xl shadow-sm">
              <span class="text-xs">استان</span>
              <strong class="text-lg"> {{data['province']}} </strong>
            </div>

            <div class="bg-white p-4 h-fit flex flex-col gap-2 justify-end rounded-xl shadow-sm">
              <span class="text-xs">شهر</span>
              <strong class="text-lg"> {{data['city']}} </strong>
            </div>

            <div class="bg-white p-4 h-fit flex flex-col gap-2 justify-end rounded-xl shadow-sm">
              <span class="text-xs">جنسیت</span>
              <strong class="text-lg"> {{data['sexuality']}} </strong>
            </div>

            <div class="bg-white p-4 h-fit flex flex-col gap-2 justify-end rounded-xl shadow-sm">
              <span class="text-xs">سن</span>
              <strong class="text-lg"> {{data['age']}} ساله</strong>
            </div>

            <div class="bg-white p-4 h-fit flex flex-col gap-2 justify-end rounded-xl shadow-sm">
              <span class="text-xs">نوع ازدواج</span>
              <strong class="text-lg"> {{data['marriageType']}} </strong>
            </div>

            @if(appService.mode == 'dating') {
              <div class="bg-white p-4 h-fit flex flex-col gap-2 justify-end rounded-xl shadow-sm">
                <span class="text-xs">وضعیت تاهل</span>
                <strong class="text-lg"> {{data['maritalStatus']}} </strong>
              </div>
            }

            <div class="bg-white p-4 h-fit flex flex-col gap-2 justify-end rounded-xl shadow-sm">
              <span class="text-xs">سبک زندگی</span>
              <strong class="text-lg"> {{data['lifeStyle']}} </strong>
            </div>

            <div class="bg-white p-4 h-fit flex flex-col gap-2 justify-end rounded-xl shadow-sm">
              <span class="text-xs">قد</span>
              <strong class="text-lg"> {{data['height']}} سانتی متر</strong>
            </div>

            <div class="bg-white p-4 h-fit flex flex-col gap-2 justify-end rounded-xl shadow-sm">
              <span class="text-xs">وزن</span>
              <strong class="text-lg"> {{data['weight']}} کیلوگرم</strong>
            </div>
          </div>

          <div class="bg-white p-4 h-fit flex flex-col gap-2 justify-end rounded-xl shadow-sm col-span-4 xl:col-span-1">
          @if(appService.mode == 'dating') {
            <span class="text-xs">درباره من و همسر من</span>
          } @else {
            <span class="text-xs">درباره من</span>
          }
            <p> {{ data['aboutMe'] }} </p>
          </div>
        </div>
      </div>
    }
  `,
  host: {
    class: 'grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 container mx-auto my-10 px-4'
  }
})
export class OneComponent {
  public data: any;
  public error?: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    public appService: AppService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      const { id } = this.activatedRoute.snapshot.params;

      this.fetch(id);
    }, 0);
  }

  private fetch(id: string) {
    this.httpService.request({
      method: 'post',
      path: `/api/v1/call/api.v1.profile.one?id=${id}&detailed=1`
    }).subscribe({
      next: (res) => {
        this.data = res['data']['profile'];
        this.error = res['data']['error'];
      }
    })
  }
}
