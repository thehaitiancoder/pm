import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AtisService } from '../services/atis.service';

@Component({
  selector: 'app-atis',
  templateUrl: './atis.component.html',
  styleUrls: ['./atis.component.css']
})
export class AtisComponent implements OnInit {
  artistProfile = null;
  artistTracks = null;

  constructor(
    private _routes: ActivatedRoute,
    private _atisService: AtisService
  ) { }

  ngOnInit() {
    this._routes.paramMap.subscribe(params => {
      let artistSlug = params.get('slug');

      this._atisService.getArtistPublicProfile(artistSlug)
      .then(artistProfile => {
        this.artistProfile = artistProfile;
        console.log(this.artistProfile)
        
        this._atisService.getArtistTracks(artistProfile.url, artistProfile._id)
        .then(artistTracks => {
          this.artistTracks = artistTracks;
          console.log(this.artistTracks)
        })
      })

      
    })
  }

}
