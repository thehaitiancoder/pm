import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-konpa',
  templateUrl: './konpa.component.html',
  styleUrls: ['./konpa.component.css']
})
export class KonpaComponent implements OnInit {
  topRapSongs = [];

  constructor(
    private _categoryService: CategoryService
  ) { }

  ngOnInit() {
    this._categoryService.topCategorySong('Konpa')
    .then(topRapSongs => {
      this.topRapSongs = topRapSongs
      console.log(this.topRapSongs)
    })
  }

}
