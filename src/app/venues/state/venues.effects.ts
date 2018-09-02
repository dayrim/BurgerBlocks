import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { VenuesService } from '../services/venues.service';
import * as VenuesAction from './venues.actions';
import { mergeMap, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable()
export class VenuesEffects {
  constructor(private actions$: Actions, private venueService: VenuesService) {}

  @Effect()
  loadVenues$: Observable<VenuesAction.Action> = this.actions$.pipe(
    ofType(VenuesAction.VenuesActionTypes.LoadVenues),
    mergeMap((action: VenuesAction.LoadVenuesAction) => {
      return this.venueService
        .getVenues()
        .pipe(map(venues => new VenuesAction.LoadVenuesSuccessAction(venues)));
    })
  );
  @Effect()
  loadVenuesAroundBusstation$: Observable<VenuesAction.Action> = this.actions$.pipe(
    ofType(VenuesAction.VenuesActionTypes.LoadVenuesAroundBusstation),
    mergeMap((action: VenuesAction.LoadVenuesAroundBusstationAction) => {
      return this.venueService
        .getVenuesAroundBusstation()
        .pipe(map(venues => new VenuesAction.LoadVenuesAroundBusstationSuccessAction(venues)));
    })
  );
  @Effect()
  loadVenueDetails$: Observable<VenuesAction.Action> = this.actions$.pipe(
    ofType(VenuesAction.VenuesActionTypes.LoadVenueDetails),
    map((action: VenuesAction.LoadVenueDetailsAction) => action.payload),
    mergeMap((id: string) =>
      this.venueService
        .getVenueDetails(id)
        .pipe(map(venueDetails => new VenuesAction.LoadVenueDetailsSuccessAction(venueDetails)))
    )
  );
}
