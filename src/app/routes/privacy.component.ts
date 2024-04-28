import { Component, HostBinding } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [],
  template: ``,
  host: {
    class: 'flex flex-col container mx-auto my-10'
  },
})
export class PrivacyComponent {

  @HostBinding('innerHTML') innerHTML: any;

  constructor(
    private httpService: HttpService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.fetchPageContent();
  }

  private fetchPageContent() {
    this.httpService.request({
      method: 'POST',
      path: '/api/v1/call/api.v1.proxy.request',
      data: {
        "method": "POST",
        "path": "/Home/rules",
      }
    }).subscribe({
      next: (res) => {
        if (res['status']) {
          let content = res['data']['data'];

          content = content.replace(new RegExp('همسریابی', 'g'), 'شبکه اجتماعی');

          this.innerHTML = this.sanitizer.bypassSecurityTrustHtml(content);
        }
      }
    })
  }
}
