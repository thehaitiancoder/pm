import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-reggea',
  templateUrl: './reggea.component.html',
  styleUrls: ['./reggea.component.css']
})
export class ReggeaComponent implements OnInit {
  topRapSongs = null;

  constructor(
    private _categoryService: CategoryService
  ) { }

  ngOnInit() {
    this._categoryService.topCategorySong('Reggea')
    .then(topRapSongs => {
      this.topRapSongs = topRapSongs
      console.log(this.topRapSongs)
    })
  }

}
