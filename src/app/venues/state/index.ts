import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { Venues } from '../models/venues';
import { VenueDetails } from '../models/venueDetails';

export interface VenuesState {
  venues: Venues;
  venuesAroundBusstation: Venues;
  venueDetails: VenueDetails;
}
export const initialState: VenuesState = {
  venues: null,
  venueDetails: null,
  venuesAroundBusstation: null
};

const getVenuesFeatureState: MemoizedSelector<object, VenuesState> = createFeatureSelector<
  VenuesState
>('venueslist');

export const getVenues: MemoizedSelector<object, Venues> = createSelector(
  getVenuesFeatureState,
  state => state.venues
);

export const getVenuesAroundBusstation: MemoizedSelector<object, Venues> = createSelector(
  getVenuesFeatureState,
  state => state.venuesAroundBusstation
);

export const getVenueDetails: MemoizedSelector<object, VenueDetails> = createSelector(
  getVenuesFeatureState,
  state => state.venueDetails
);
