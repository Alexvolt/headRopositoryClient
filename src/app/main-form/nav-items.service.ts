import { Injectable } from '@angular/core';

import { AuthenticationService } from '../authentication/index';


@Injectable()
export class NavItemsService {
  
  navItemsMain = [
    {name: 'Главная', route: ''}
  ];
  
  navItemsAuth = [
  ];

  constructor(private authService: AuthenticationService) {
    this.fillNavItems();
    this.authService.getMessage().subscribe(message => { this.fillNavItemsAuth(message.loggedIn); });
  }

  fillNavItems() {
    let user = localStorage.getItem('currentUser');
    let loggedIn = this.loggedIn();
    this.fillNavItemsAuth(loggedIn);
  }

  fillNavItemsAuth(loggedIn: boolean) {
    if (loggedIn)
      this.navItemsAuth = [
        {name: 'Выйти', route: '/login'},
        {name: 'Профиль', route: '/profile'},
        {name: 'Администрирование', route: '/admin'},
     ];
    else
      this.navItemsAuth = [
        {name: 'Войти', route: '/login'},
         {name: 'Регистрация', route: '/register'}
      ];
  }

  loggedIn(): boolean {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      return true;
    }
    return false;
  }
}
