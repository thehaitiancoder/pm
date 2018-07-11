import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

declare var ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private _router: Router
  ){
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        (<any>window).ga('set', 'page', this._router.url);
        (<any>window).ga('send', 'pageview');
        console.log(this._router.url);
      }
    });
  }
}
