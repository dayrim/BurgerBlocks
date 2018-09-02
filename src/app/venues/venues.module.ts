import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VenuesListComponent } from './components/venues-list.component';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/venues.reducer';
import { VenuesShellComponent } from './containers/venues.shell';
import { EffectsModule } from '@ngrx/effects';
import { VenuesEffects } from './state/venues.effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { VenuesService } from './services/venues.service';

const venuesRoutes: Routes = [{ path: '', component: VenuesShellComponent }];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCLYIf2NKPSeNDHXW8XJ9bblvzrh577Hvk'
    }),
    RouterModule.forChild(venuesRoutes),
    EffectsModule.forFeature([VenuesEffects]),
    StoreModule.forFeature('venueslist', reducer)
  ],
  declarations: [VenuesListComponent, VenuesShellComponent],
  providers: [VenuesService]
})
export class VenuesModule {}
