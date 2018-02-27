import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-rap',
  templateUrl: './rap.component.html',
  styleUrls: ['./rap.component.css']
})
export class RapComponent implements OnInit {
  topRapSongs = null;
  randomSong: Object;

  constructor(
    private _categoryService: CategoryService
  ) { }

  ngOnInit() {
    this._categoryService.topCategorySong('Rap')
    .then(topRapSongs => {
      this.topRapSongs = topRapSongs
      console.log(this.topRapSongs)
    })
    .catch(errors => console.log(errors))

  }

}
