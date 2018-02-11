import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
  categoriesNameAndSongsCount = null

  constructor(
    private _categoryService: CategoryService
  ) { }

  ngOnInit() {
    this._categoryService.getCategoriesSongsCount()
    .then(categoriesAndSongsCount => {
      this.categoriesNameAndSongsCount = categoriesAndSongsCount
      console.log(this.categoriesNameAndSongsCount)
    })
  }

}
