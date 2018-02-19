import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-atis',
  templateUrl: './atis.component.html',
  styleUrls: ['./atis.component.css']
})
export class AtisComponent implements OnInit {

  constructor(
    private _routes: ActivatedRoute
  ) { }

  ngOnInit() {
    this._routes.paramMap.subscribe(params => {
      let artistName = params.get('atis');
      console.log(artistName)
    })
  }

}
