import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home-page/home-page.component').then(c => c.HomePageComponent)
  },
  {
    path: 'counsellors',
    loadComponent: () =>
      import('./components/counsellors-page/counsellors-page.component').then(c => c.CounsellorsBrowseComponent)
  },
  {
    path: 'counsellors/:id',
    loadComponent: () =>
      import('./components/counsellor-detail/counsellor-detail.component').then(c => c.CounsellorDetailComponent)
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./components/about/about.component').then(c => c.AboutComponent)
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./components/contact/contact.component').then(c => c.ContactComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
