import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { CookieModule } from 'ngx-cookie';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FirstMenuComponent } from './first-menu/first-menu.component';

import { AuthService } from './services/auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddLyricComponent } from './dashboard/add-lyric/add-lyric.component';
import { DashhomeComponent } from './dashboard/dashhome/dashhome.component';
import { LyricService } from './services/lyric.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FirstMenuComponent,
    DashboardComponent,
    AddLyricComponent,
    DashhomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    CookieModule.forRoot()
  ],
  providers: [AuthService, LyricService],
  bootstrap: [AppComponent]
})
export class AppModule { }
