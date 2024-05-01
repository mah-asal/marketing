import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-one',
  standalone: true,
  imports: [],
  template: `
    @if(data) {
      <div class="flex flex-col gap-4 h-fit md:sticky md:top-4 col-span-4 md:col-span-2 lg:col-span-1">
        <img src="{{data['image']}}" alt="{{data['title']}}" class="rounded-xl object-cover object-center" />

        <div class="flex flex-wrap gap-1">
          @for(tag of data.tags; track $index) {
            <span class="blog px-2 py-1 w-fit bg-gray-200 rounded-md text-xs">#{{tag}}</span>
          }
        </div>

        <strong>{{data.title}}</strong>

        <span class="mt-2 text-purple-500 text-xs">{{data.date}}</span>
      </div>

      <div class="flex flex-col col-span-4 md:col-span-2 lg:col-span-3" [innerHTML]="formatedHTML">
          
      </div>
    }
  `,
  host: {
    class: 'grid grid-cols-4 gap-4 container mx-auto my-10 px-4'
  }
})
export class OneComponent {
  public data: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    setTimeout(() => {
      const { id } = this.activatedRoute.snapshot.params;

      this.fetch(id);
    }, 0);
  }

  public get formatedHTML() {
    return this.sanitizer.bypassSecurityTrustHtml(this.data['html']);
  }

  private fetch(id: string) {
    this.httpService.request({
      method: 'get',
      path: `/api/v1/call/api.v1.blog.one?id=${id}`
    }).subscribe({
      next: (res) => {
        this.data = res['data'];
      }
    })
  }
}
