import { Venues } from '../models/venues';
import { VenueDetails } from '../models/venueDetails';

export enum VenuesActionTypes {
  LoadVenues = '[VENUES] LOAD_VENUES',
  LoadVenuesSuccess = '[VENUES] LOAD_VENUES_SUCCESS',
  LoadVenuesAroundBusstation = '[VENUES] LOAD_VENUES_AROUND_BUSSTATION',
  LoadVenuesAroundBusstationSuccess = '[VENUES] LOAD_VENUES_AROUND_BUSSTATION_SUCCESS',
  LoadVenueDetails = '[VENUES] LOAD_VENUE_DETAILS',
  LoadVenueDetailsSuccess = '[VENUES] LOAD_VENUE_DETAILS_SUCCESS'
}
export class LoadVenuesAction {
  readonly type = VenuesActionTypes.LoadVenues;
  constructor(public payload: any = null) {}
}
export class LoadVenuesSuccessAction {
  readonly type = VenuesActionTypes.LoadVenuesSuccess;
  constructor(public payload: Venues) {}
}
export class LoadVenuesAroundBusstationAction {
  readonly type = VenuesActionTypes.LoadVenuesAroundBusstation;
  constructor(public payload: any = null) {}
}
export class LoadVenuesAroundBusstationSuccessAction {
  readonly type = VenuesActionTypes.LoadVenuesAroundBusstationSuccess;
  constructor(public payload: Venues) {}
}
export class LoadVenueDetailsAction {
  readonly type = VenuesActionTypes.LoadVenueDetails;
  constructor(public payload: string) {}
}
export class LoadVenueDetailsSuccessAction {
  readonly type = VenuesActionTypes.LoadVenueDetailsSuccess;
  constructor(public payload: VenueDetails) {}
}

export type Action =
  | LoadVenuesAction
  | LoadVenuesSuccessAction
  | LoadVenuesAroundBusstationAction
  | LoadVenuesAroundBusstationSuccessAction
  | LoadVenueDetailsAction
  | LoadVenueDetailsSuccessAction;
