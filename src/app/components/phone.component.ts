import { Component } from '@angular/core';

@Component({
  selector: 'app-phone',
  standalone: true,
  imports: [],
  template: `
      <img src="/assets/images/demo.webp" alt="Phone demo" class="p-4 pt-8"/>
      <img src="/assets/images/mockup.webp" alt="iphone mockup" />
  `,
  host: {
    class: 'relative w-[300px] h-[600px] overflow-hidden shadow-2xl rounded-[3.5rem] bg-white'
  },
  styles: `
    img {
      position: absolute;
      inset: 0;

      object-fit: contain;
      object-position: center;

      width: 100%;
      height: 100%;
    }
  `
})
export class PhoneComponent {

}
