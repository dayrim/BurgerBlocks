import * as VenuesAction from './venues.actions';
import { VenuesState, initialState } from '.';

export function reducer(state = initialState, action: VenuesAction.Action): VenuesState {
  switch (action.type) {
    case VenuesAction.VenuesActionTypes.LoadVenuesSuccess: {
      return {
        ...state,
        venues: action.payload
      };
    }
    case VenuesAction.VenuesActionTypes.LoadVenuesAroundBusstationSuccess: {
      return {
        ...state,
        venuesAroundBusstation: action.payload
      };
    }
    case VenuesAction.VenuesActionTypes.LoadVenueDetailsSuccess: {
      return {
        ...state,
        venueDetails: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
