import { Injectable } from '@angular/core';

import { AuthenticationService, CredentialsService } from '../core/authentication/index';


@Injectable()
export class NavItemsService {
  
  navItemsMain = [
    {name: 'Главная', route: ''}
  ];
  
  navItemsAuth = [
  ];

  constructor(
    private authService: AuthenticationService,
    private credentialsService: CredentialsService
  ) {
    this.authService.getMessage().subscribe(message => { this.fillNavItems(); });
    //this.fillNavItems();
  }

  fillNavItems() {
    let loggedIn = this.credentialsService.loggedIn();
    let isAdmin  = this.credentialsService.isAdmin();
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

}
