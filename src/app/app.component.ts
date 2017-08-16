import {
  Component,
  ViewEncapsulation,
  ElementRef,
  ChangeDetectionStrategy,
  Renderer2,
} from '@angular/core';
import {OverlayContainer} from '@angular/material';

const changeDetectionKey = 'mdDemoChangeDetection';

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
  //dark = false;
  //changeDetectionStrategy: string;
  navItems = [
    {name: 'Главная', route: ''},
    {name: 'Войти', route: '/login'},
    {name: 'Регистрация', route: '/register'}
  ];

  constructor(
    private _element: ElementRef,
    private _renderer: Renderer2,
    private _overlayContainer: OverlayContainer) {
    // Some browsers will throw when trying to access localStorage in incognito.
    //try {
    //  this.changeDetectionStrategy = window.localStorage.getItem(changeDetectionKey) || 'Default';
    //} catch (error) {
    //  console.error(error);
    //}
  }

}
