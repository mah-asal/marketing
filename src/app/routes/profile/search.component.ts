import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DOCUMENT, NgClass } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpService } from '../../services/http.service';
import { SelectComponent } from '../../components/select.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { PaginationComponent } from '../../components/pagination.component';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatIconModule, RouterLink, ReactiveFormsModule, FormsModule, MatSlideToggleModule, MatInputModule, SelectComponent, MatButtonModule, MatProgressSpinnerModule, NgClass, PaginationComponent],
  template: `
    <button mat-flat-button class="md:!hidden !absolute -top-[50px] left-4 w-fit" [ngClass]="{'!hidden': visableFilters}" (click)="visableFilters = true;">
      <span>فیلتر ها</span>
    </button>

    <div class="grid grid-cols-8 gap-4 container mx-auto z-0 relative">
      <form [formGroup]="form" 
        class="flex flex-col gap-2 p-4 md:col-span-3 lg:col-span-2 md:h-fit -md:fixed -md:inset-0 -md:z-10 md:sticky md:top-2 bg-white rounded-xl"
        [ngClass]="{
          '-md:hidden': visableFilters == false
        }"
      >
        <div class="flex flex-nowrap items-center gap-2 p-2">
          <button mat-icon-button (click)="visableFilters = false" class="md:!hidden">
            <mat-icon>close</mat-icon>
          </button>

          <strong>فیلتر ها</strong>

          <div class="flex-1"></div>

          <button type="button" (click)="resetFilters()" mat-flat-button color="warn">حذف فیلتر ها</button>
        </div>

        <app-select formControlName="province" groupKey="province" label="استان" (change)="form.get('city')!.setValue('-1')" [data]="[{text: 'همه استان ها', value: '-1'}]" />

        <app-select formControlName="city" groupKey="city" label="شهر" [data]="[{text: 'همه شهر ها', value: '-1'}]" [parent]="form.get('province')!.value!" />
        
        <app-select formControlName="marital" groupKey="MaritalStatus" label="وضعیت تاهل" [data]="[{text: 'فرقی ندارد', value: '-1'}]" />

        @if(appService.mode == 'dating') {
          <app-select formControlName="marriageType" groupKey="MarriageType" label="نوع ازدواج" [data]="[{text: 'فرقی ندارد', value: '-1'}]" />
        }

        <div class="grid grid-cols-2 gap-4">
          <app-select formControlName="minAge" groupKey="Age" label="از سن" [data]="[{text: 'از هر سنی', value: '-1'}]" />

          <app-select formControlName="maxAge" groupKey="Age" label="تا سن" [data]="[{text: 'تا هر سنی', value: '-1'}]" />
        </div>

        <mat-slide-toggle formControlName="image">
          <span class="px-4">نمایش کاربران عکس دار</span>
        </mat-slide-toggle>

        @if(total != 0) {
          <div class="flex flex-nowrap items-center gap-1 text-sm border-t border-black/30 p-2 mt-2">
            <span>تعداد نتایج یافت شده</span>
            <span>{{total}}</span>
            <span>در</span>
            <span>{{took}} ثانیه</span>
          </div>
        }

        <button (click)="visableFilters = false" mat-flat-button class="!fixed bottom-4 left-4 right-4 md:!hidden">
          اعمال فیلتر
        </button>
      </form>

      <div class="col-span-8 md:col-span-5 lg:col-span-6 flex flex-col gap-2">
        @if(took != 0 && total == 0) {
          <div class="flex flex-col items-center justify-center gap-10 h-96">
            <i class="material-icons text-red-500 !w-24 !h-24 text-8xl">priority_high</i>

            <strong class="text-xl">نتیجه ای یافت نشد</strong>
          </div>
        }

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          @for (item of data; track $index) {
            <a routerLink="/profile/{{item.id}}" class="flex flex-col gap-1 overflow-hidden rounded-lg relative p-4 bg-white transition-all hover:shadow-xl hover:z-10">
              <img src="{{item.avatar}}" alt="{{item.fullname}}" class="w-full object-cover object-center rounded-lg h-[250px] bg-gray-100"/>

              <div class="absolute top-6 right-6 flex flex-nowrap items-center gap-2 bg-white/60 backdrop-blur px-2 py-1 text-xs rounded-full">
                @if(item.seen == 'online') {
                  <div class="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>آنلاین</span>
                }

                @if(item.seen == 'offline') {
                  <div class="w-2 h-2 rounded-full bg-red-500"></div>
                  <span>آفلاین</span>
                }

                @if(item.seen == 'recently') {
                  <div class="w-2 h-2 rounded-full bg-amber-500"></div>
                  <span>اخیرا آنلاین</span>
                }
              </div>
              
              @if(item.verified == true) {
                <mat-icon class="!text-blue-500 absolute top-6 left-6">verified</mat-icon>
              }

              <div class="flex flex-nowrap items-center justify-between mt-2">
                <div class="flex flex-col">
                  <strong>{{item.fullname}}</strong>
                  <span class="text-xs">{{item.age}} ساله</span>
                </div>
                  
                <div class="bg-gray-200 rounded-lg px-2 py-1 flex flex-nowrap items-center gap-1">
                  <mat-icon class="!w-[18px] !h-[18px] !text-[18px] text-blue-500">location_on</mat-icon>
                  <span class="text-xs">{{item.city}}</span>
                </div>
              </div>

            </a>
          }
        </div>

        <!-- pagination -->
        <app-pagination [last]="last" [(page)]="page" (pageChange)="timeoutSearch()"/>
    </div>

    <div class="w-full min-h-[100px]"></div>
  `,
  host: {
    class: 'flex flex-col relative'
  },
})
export class SearchComponent {
  public searching: boolean = false;
  public page: number = 1;
  public limit: number = 12;
  public last: number = 1;
  public total: number = 0;
  public took: number = 0;

  public visableFilters: boolean = false;

  public data: any[] = [];

  public form = new FormGroup({
    'province': new FormControl('-1'),
    'city': new FormControl('-1'),
    'marital': new FormControl('-1'),
    'marriageType': new FormControl('-1'),
    'minAge': new FormControl('-1'),
    'maxAge': new FormControl('-1'),
    'image': new FormControl(false),
  });

  private timeout: any;

  constructor(
    @Inject(DOCUMENT)
    private document: Document,
    private httpService: HttpService,
    public appService: AppService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.document.querySelector('mat-sidenav-content')!.classList.add('bg-white')

    this.searchFromQueries();

    this.activatedRoute.queryParams.subscribe(() => {
      this.searchFromQueries();
    });

    this.form.valueChanges.subscribe(() => {
      this.timeoutSearch();
    })
  }

  ngOnDestroy() {
    this.document.querySelector('mat-sidenav-content')!.classList.remove('bg-white')
  }

  public resetFilters() {
    this.form.patchValue({
      'province': '-1',
      'city': '-1',
      'marital': '-1',
      'marriageType': '-1',
      'minAge': '-1',
      'maxAge': '-1',
      'image': false
    });
  }

  public timeoutSearch() {
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.search();
    }, 100);
  }

  private searchFromQueries() {
    setTimeout(() => {
      const queries = this.activatedRoute.snapshot.queryParams;


      const page = parseInt(queries['page']) ?? 1;

      if (isNaN(page)) {
        this.page = 1;
      } else {
        this.page = page;
      }

      this.form.patchValue({
        ...queries,
        image: queries['image'] == 'true' ? true : false,
      });

      this.timeoutSearch();
    }, 0);
  }

  private search() {
    if (this.searching == true) return;

    this.searching = true;

    let filters: any = {};

    const filter = this.form.value;

    if (filter['province'] != null && filter['province'] != '-1') {
      filters['Province'] = filter['province'];
    }

    if (filter['city'] != null && filter['city'] != '-1') {
      filters['City'] = filter['city'];
    }

    if (filter['minAge'] != null && filter['minAge'] != '-1') {
      filters['StartAge'] = filter['minAge'];
    }

    if (filter['maxAge'] != null && filter['maxAge'] != '-1') {
      filters['EndAge'] = filter['maxAge'];
    }

    if (filter['marital'] != null && filter['marital'] != '-1') {
      filters['MaritalStatus'] = filter['marital'];
    }

    if (filter['marriageType'] != null && filter['marriageType'] != '-1') {
      filters['MarriageType'] = filter['marriageType'];
    }

    if (filter['image'] != null) {
      filters['HasImage'] = filter['image'] == true ? '1' : '0';
    }

    this.httpService.request({
      method: 'POST',
      path: '/api/v1/call/api.v1.profile.search',
      data: {
        page: this.page,
        limit: this.limit,
        filters,
      }
    }).subscribe({
      next: (res) => {
        this.searching = false;

        if (res['status']) {
          this.last = res['meta']['last'];
          this.total = res['meta']['total'];
          this.took = res['meta']['took'] / 1000;

          this.data = res['data'];

          this.router.navigate(['/profile/search'], { queryParams: { ...this.form.value, page: this.page } });

          // if (this.document.querySelector('mat-sidenav-content') && this.document.querySelector('mat-sidenav-content')!.scrollTo instanceof Function) {
          //   this.document.querySelector('mat-sidenav-content')!.scrollTo({
          //     top: 0,
          //     behavior: 'smooth'
          //   })
          // }
        }
      }
    })
  }
}
