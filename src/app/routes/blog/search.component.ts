import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { PaginationComponent } from '../../components/pagination.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [PaginationComponent, RouterLink],
  template: `
    <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
      @for (item of data; track $index) {
        <a routerLink="/blog/{{item.id}}/{{item.slug}}" class="flex flex-col gap-1 overflow-hidden rounded-lg relative p-4 bg-white transition-all shadow-sm hover:shadow-xl hover:z-10">
          <img src="{{item.image}}" alt="{{item.title}}" class="w-full object-contain object-center rounded-lg mb-4"/>

          <div class="flex flex-wrap gap-1">
            @for(tag of item.tags; track $index) {
              <span class="blog px-2 py-1 w-fit bg-gray-200 rounded-md text-xs">#{{tag}}</span>
            }
          </div>

          <strong>{{item.title}}</strong>

          <p class="text-sm text-gray-600 mb-auto">
            {{ item.content }}
          </p>
          
          <span class="mt-2 text-purple-500 text-xs">{{item.date}}</span>
        </a>
      }
    </div>

    <!-- pagination -->
    <app-pagination [last]="last" [(page)]="page" (pageChange)="timeoutSearch()"/>
  `,
  host: {
    class: 'flex flex-col relative container mx-auto my-10 px-4'
  },
})
export class SearchComponent {
  public searching: boolean = false;
  public page: number = 1;
  public limit: number = 20;
  public last: number = 1;
  public total: number = 0;
  public took: number = 0;

  private timeout: any;

  public data: any[] = [];

  constructor(
    @Inject(DOCUMENT)
    private document: Document,
    private httpService: HttpService,
  ) { }

  ngOnInit() {

    this.search();
  }

  public timeoutSearch() {
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.search();
    }, 100);
  }

  private search() {
    if (this.searching == true) return;

    this.searching = true;


    this.httpService.request({
      method: 'POST',
      path: '/api/v1/call/api.v1.blog.search',
      data: {
        page: this.page,
        limit: this.limit
      },
    }).subscribe({
      next: (res) => {
        this.searching = false;

        if (res['status']) {
          this.last = res['meta']['last'];
          this.total = res['meta']['total'];
          this.took = res['meta']['took'] / 1000;

          this.data = res['data'];

          if (this.document.querySelector('mat-sidenav-content') && this.document.querySelector('mat-sidenav-content')!.scrollTo instanceof Function) {
            this.document.querySelector('mat-sidenav-content')!.scrollTo({
              top: 0,
              behavior: 'smooth'
            })
          }
        }
      }
    })
  }
}
