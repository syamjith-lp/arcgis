import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteFinderMainComponent } from './site-finder-main/site-finder-main.component';

const routes: Routes = [
  {
    path: '',
     component: SiteFinderMainComponent
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
