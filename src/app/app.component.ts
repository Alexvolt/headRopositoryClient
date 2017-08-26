import {
  Component,
  ViewEncapsulation,
} from '@angular/core';

import { NavItemsService } from './main-form/nav-items.service';


/**
 * MainApp with toolbar and sidenav.
 */
@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  // navItems = [
  //   {name: 'Главная', route: ''},
  //   {name: 'Войти', route: '/login'},
  //   {name: 'Регистрация', route: '/register'}
  // ];

  constructor(public navItemsService: NavItemsService) {
    //navItemsService.fillNavItems();
  }

}
