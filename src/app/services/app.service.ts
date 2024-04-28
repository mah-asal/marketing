import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public pwaEndpoint: string = 'https://tv-92.com';

  public links: ILink[] = [
    {
      icon: 'phone',
      text: 'تماس با ما',
      path: '/contact'
    },
    {
      icon: 'gavel',
      text: 'قوانین و مقررات',
      path: '/privacy'
    },
    {
      icon: 'search',
      text: 'جستجو کاربران',
      path: '/profile/search'
    },
  ];

}

interface ILink {
  icon: string;
  text: string;
  path: string;
}