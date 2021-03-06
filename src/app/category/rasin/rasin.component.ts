import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-rasin',
  templateUrl: './rasin.component.html',
  styleUrls: ['./rasin.component.css']
})
export class RasinComponent implements OnInit {
  topRapSongs = null;

  constructor(
    private _categoryService: CategoryService
  ) { }

  ngOnInit() {
    this._categoryService.topCategorySong('Rasin')
    .then(topRapSongs => {
      this.topRapSongs = topRapSongs
      console.log(this.topRapSongs)
    })
  }

}
