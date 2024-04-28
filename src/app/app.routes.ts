import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: async () => (await import('./routes/home.component')).HomeComponent,
        title: 'ماه عسل'
    },
    {
        path: 'contact',
        loadComponent: async () => (await import('./routes/contact.component')).ContactComponent,
        title: 'ماه عسل | تماس با ما',
    },
    {
        path: 'privacy',
        loadComponent: async () => (await import('./routes/privacy.component')).PrivacyComponent,
        title: 'ماه عسل | قوانین و مقررات',
    },
    {
        path: 'profile/search',
        loadComponent: async () => (await import('./routes/profile/search.component')).SearchComponent,
        title: 'ماه عسل | جستجو کاربران'
    },
    {
        path: 'profile/:id',
        loadComponent: async () => (await import('./routes/profile/one.component')).OneComponent
    }
];
