import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SiteFinderMainComponent } from './site-finder-main/site-finder-main.component';
import { SiteFinderEsiriComponent } from './site-finder-esiri/site-finder-esiri.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// import {
//   MSALGuardConfigFactory,
//   MSALInstanceFactory,
//   MSALInterceptorConfigFactory,
// } from './interceptor/interceptor.helper';

@NgModule({
  declarations: [
    AppComponent,
    SiteFinderMainComponent,
    SiteFinderEsiriComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
