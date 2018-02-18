import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-kanaval',
  templateUrl: './kanaval.component.html',
  styleUrls: ['./kanaval.component.css']
})
export class KanavalComponent implements OnInit {
  topRapSongs = null;

  constructor(
    private _categoryService: CategoryService
  ) { }

  ngOnInit() {
    this._categoryService.topCategorySong('Kanaval')
    .then(topRapSongs => {
      this.topRapSongs = topRapSongs
      console.log(this.topRapSongs)
    })
  }

}
