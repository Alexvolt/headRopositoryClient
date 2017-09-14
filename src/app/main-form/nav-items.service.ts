import { Injectable } from '@angular/core';
import { CredentialsService } from "../core/authentication/credentials.service";

@Injectable()
export class NavItemsService {
  constructor(
    private credentialsService: CredentialsService) {}

  getNavItems() {
    let loggedIn = this.credentialsService.loggedIn();
    let isAdmin  = this.credentialsService.isAdmin();
    let navItemsAuth = [];
    if (loggedIn)
      navItemsAuth = [
        {name: 'Выйти', route: '/login'},
        {name: 'Профиль', route: '/profile'},
        {name: 'Администрирование', route: '/admin'},
     ];
    else
      navItemsAuth = [
        {name: 'Войти', route: '/login'},
        {name: 'Регистрация', route: '/register'}
      ];

    return {
      navItemsAuth: navItemsAuth,
      loggedIn: loggedIn,
      isAdmin: isAdmin,
      currentUserName: this.credentialsService.currentUserName(),
    }
  }

}
