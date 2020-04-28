import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GridsterModule } from 'angular-gridster2';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { RssComponent } from './components/rss/rss.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MeteoByDayComponent } from './components/meteo-by-day/meteo-by-day.component';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './views/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GmapComponent } from './components/gmap/gmap.component';
import { AgmCoreModule } from '@agm/core';
import { TodolistComponent } from './components/todolist/todolist.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MeteoByDayBiggerComponent } from './components/meteo-by-day-bigger/meteo-by-day-bigger.component';
import { JeuxvideoRssComponent } from './components/jeuxvideo-rss/jeuxvideo-rss.component';
import { LeMondeRssComponent } from './components/le-monde-rss/le-monde-rss.component';
import {MatInputModule} from '@angular/material/input';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    RssComponent,
    NavbarComponent,
    MeteoByDayComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    GmapComponent,
    TodolistComponent,
    MeteoByDayBiggerComponent,
    JeuxvideoRssComponent,
    LeMondeRssComponent,
  ],
  imports: [
    BrowserModule,
    GridsterModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatInputModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBlwohvAyosK18Z7nc7_LiGuobJb9XRYVc'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }