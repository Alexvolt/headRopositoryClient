import {
  Component,
  ViewEncapsulation,
} from '@angular/core';

import { NavItemsService } from './main-form/nav-items.service';
import { AlertService } from './core/index';
import 'rxjs/add/operator/delay';


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
  navItemsMain = [
    {name: 'Главная', route: ''},
  ];
  navItemsAuth = [];

  constructor(
    private navItemsService: NavItemsService,
    private alertService: AlertService
  ) {
    this.navItemsAuth = navItemsService.getNavItems();
    // delay need because of error in angular: it does not make any problems for app, but error is error
    navItemsService.getMessage().delay(500).subscribe(
      navItems => {this.navItemsAuth = navItems;},
      error => { this.alertService.error(error); }
    )
  }

}
