import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SiteFinderMainComponent } from './site-finder-main/site-finder-main.component';
import { SiteFinderEsiriComponent } from './site-finder-esiri/site-finder-esiri.component';

@NgModule({
  declarations: [
    AppComponent,
    SiteFinderMainComponent,
    SiteFinderEsiriComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
