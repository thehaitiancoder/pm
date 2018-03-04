import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AtisService } from '../services/atis.service';

@Component({
  selector: 'app-alphabetical-artist-list',
  templateUrl: './alphabetical-artist-list.component.html',
  styleUrls: ['./alphabetical-artist-list.component.css']
})
export class AlphabeticalArtistListComponent implements OnInit {
  artistsInAlphabeticalOrder: Array<Object> = [];
  letterToRequest: String = '';

  constructor(
    private _routes: ActivatedRoute,
    private _atisService: AtisService
  ) { }

  ngOnInit() {
    this._routes.paramMap.subscribe(params => {
      this.letterToRequest = params.get('letter');

      this._atisService.getArtistsInAlphabeticalOrder(this.letterToRequest)
      .then(artists => {this.artistsInAlphabeticalOrder = artists;})
    })
  }

}
