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
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
