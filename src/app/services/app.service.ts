import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public pwaEndpoint: string = '';
  public pwaVisabable: boolean = false;

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

  constructor(
    private httpService: HttpService
  ) {
    this.httpService.request({
      method: 'GET',
      url: 'https://raw.githubusercontent.com/mah-asal/config/main/config.json'
    }).subscribe({
      next: (res) => {
        this.pwaEndpoint = res['public'];
      }
    })
  }
}

interface ILink {
  icon: string;
  text: string;
  path: string;
}