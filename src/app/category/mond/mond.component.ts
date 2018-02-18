import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-mond',
  templateUrl: './mond.component.html',
  styleUrls: ['./mond.component.css']
})
export class MondComponent implements OnInit {
  topRapSongs = null;

  constructor(
    private _categoryService: CategoryService
  ) { }

  ngOnInit() {
    this._categoryService.topCategorySong('Mond')
    .then(topRapSongs => {
      this.topRapSongs = topRapSongs
      console.log(this.topRapSongs)
    })
  }

}
