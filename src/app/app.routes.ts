import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './venues/components/not-found.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'fastfood', pathMatch: 'full' },
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'fastfood',
        loadChildren: './venues/venues.module#VenuesModule'
      },
      { path: '', redirectTo: 'fastfood', pathMatch: 'full' }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
