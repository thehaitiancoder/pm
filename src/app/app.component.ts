import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // I was trying to set a background image only on the homepage
  // showBackground= '';

  // constructor(
  //   private _router: Router
  // ){
  //   // if (this._router.url == '/') { this.showBackground = true}
  //   // else { this.showBackground = false }

  //   setTimeout(() => {
  //     if (this._router.url == '/') { this.showBackground = 'show'}
  //     console.log(this._router.url)
  //   });
  // }
}
