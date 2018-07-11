import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-raboday',
  templateUrl: './raboday.component.html',
  styleUrls: ['./raboday.component.css']
})
export class RabodayComponent implements OnInit {
  topRapSongs = null;

  constructor(
    private _categoryService: CategoryService
  ) { }

  ngOnInit() {
    this._categoryService.topCategorySong('Raboday')
    .then(topRapSongs => {
      this.topRapSongs = topRapSongs
      // console.log(this.topRapSongs)
    })
  }

}
