import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CookieModule } from 'ngx-cookie';

import { AuthService } from './services/auth.service';
import { LyricService } from './services/lyric.service';
import { CategoryService } from './services/category.service';
import { AtisService } from './services/atis.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FirstMenuComponent } from './first-menu/first-menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddLyricComponent } from './dashboard/add-lyric/add-lyric.component';
import { DashhomeComponent } from './dashboard/dashhome/dashhome.component';
import { EarningDetailsComponent } from './dashboard/earning-details/earning-details.component';
import { LyricDisplayComponent } from './lyric-display/lyric-display.component';
import { FooterComponent } from './footer/footer.component';
import { TopLyricsComponent } from './top-lyrics/top-lyrics.component';
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
import { AlphabeticalArtistListComponent } from './alphabetical-artist-list/alphabetical-artist-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FirstMenuComponent,
    DashboardComponent,
    AddLyricComponent,
    DashhomeComponent,
    EarningDetailsComponent,
    LyricDisplayComponent,
    FooterComponent,
    TopLyricsComponent,
    CategoryComponent,
    RapComponent,
    KonpaComponent,
    AllComponent,
    KanavalComponent,
    RabodayComponent,
    LevanjilComponent,
    AngajeComponent,
    RasinComponent,
    TwoubadouComponent,
    ReggeaComponent,
    MondComponent,
    AtisComponent,
    AlphabeticalArtistListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    CookieModule.forRoot()
  ],
  providers: [AuthService, LyricService, CategoryService, AtisService],
  bootstrap: [AppComponent]
})
export class AppModule { }
