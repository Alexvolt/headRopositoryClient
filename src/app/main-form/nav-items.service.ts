import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { AuthenticationService, CredentialsService } from '../core/authentication/index';


@Injectable()
export class NavItemsService {
  private subject = new Subject<any>();
  
  constructor(
    private authService: AuthenticationService,
    private credentialsService: CredentialsService
  ) {
    this.authService.getMessage().subscribe(
      message => { this.fillNavItems(); }//,
      //error => { this.alertService.error(error); }
    );
  }

  getNavItems() {
    let loggedIn = this.credentialsService.loggedIn();
    let isAdmin  = this.credentialsService.isAdmin();
    let navItemsAuth = [];
    if (loggedIn)
      return [
        {name: 'Выйти', route: '/login'},
        {name: 'Профиль', route: '/profile'},
        {name: 'Администрирование', route: '/admin'},
     ];
    else
      return [
        {name: 'Войти', route: '/login'},
        {name: 'Регистрация', route: '/register'}
      ];
  }
  
  fillNavItems() {
    this.subject.next(this.getNavItems());
  }
  
  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

}
