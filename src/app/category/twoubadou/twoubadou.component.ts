import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-twoubadou',
  templateUrl: './twoubadou.component.html',
  styleUrls: ['./twoubadou.component.css']
})
export class TwoubadouComponent implements OnInit {
  topRapSongs = null;

  constructor(
    private _categoryService: CategoryService
  ) { }

  ngOnInit() {
    this._categoryService.topCategorySong('Twoubadou')
    .then(topRapSongs => {
      this.topRapSongs = topRapSongs
      console.log(this.topRapSongs)
    })
  }

}
