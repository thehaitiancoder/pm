import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddLyricComponent } from './dashboard/add-lyric/add-lyric.component';
import { FirstMenuComponent } from './first-menu/first-menu.component';
import { DashhomeComponent } from './dashboard/dashhome/dashhome.component';
import { EarningDetailsComponent } from './dashboard/earning-details/earning-details.component';
import { LyricDisplayComponent } from './lyric-display/lyric-display.component';
import { CategoryComponent } from './category/category.component';
import { RapComponent } from './category/rap/rap.component';
import { KonpaComponent } from './category/konpa/konpa.component';
import { AllComponent } from './category/all/all.component';
import { KanavalComponent } from './category/kanaval/kanaval.component';
import { RabodayComponent } from './category/raboday/raboday.component';
import { LevanjilComponent } from './category/levanjil/levanjil.component';
import { AngajeComponent } from './category/angaje/angaje.component';
import { RasinComponent } from './category/rasin/rasin.component';
import { TwoubadouComponent } from './category/twoubadou/twoubadou.component';
import { ReggeaComponent } from './category/reggea/reggea.component';
import { MondComponent } from './category/mond/mond.component';
import { AtisComponent } from './atis/atis.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'logged',
    redirectTo: 'dashboard'
  },
  {
    path: 'category',
    component: CategoryComponent,
    children: [
      {
        path: '',
        redirectTo: 'all',
        pathMatch: 'full'
      },
      {
        path: 'all',
        component: AllComponent
      },
      {
        path: 'rap',
        component: RapComponent
      },
      {
        path: 'konpa',
        component: KonpaComponent
      },
      {
        path: 'kanaval',
        component: KanavalComponent
      },
      {
        path: 'raboday',
        component: RabodayComponent
      },
      {
        path: 'levanjil',
        component: LevanjilComponent
      },
      {
        path: 'angaje',
        component: AngajeComponent
      },
      {
        path: 'rasin',
        component: RasinComponent
      },
      {
        path: 'twoubadou',
        component: TwoubadouComponent
      },
      {
        path: 'reggea',
        component: ReggeaComponent
      },
      {
        path: 'mond',
        component: MondComponent
      }
    ]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: DashhomeComponent
      },
      {
        path: 'lyric',
        component: AddLyricComponent
      },
      {
        path: 'earning-details',
        component: EarningDetailsComponent
      }
    ]
  },

  {
    path: 'lyrics/:url',
    component: LyricDisplayComponent
  },
  {
    path: ':atis',
    component: AtisComponent
  },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
