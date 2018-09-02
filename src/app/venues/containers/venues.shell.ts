import { Component, OnInit } from '@angular/core';
import { Venues } from '../models/venues';
import { Observable, BehaviorSubject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as VenuesAction from '../state/venues.actions';
import * as VenuesSelector from '../state';
import { Marker } from '../models/markers';
import { VenueDetails } from '../models/venueDetails';
import { combineLatest } from 'rxjs';

@Component({
  template: `
    <app-venueslist [markers]="markers$ | async">
     </app-venueslist>`
})
export class VenuesShellComponent implements OnInit {
  venues$: Observable<Venues>;
  venuesAroundBusstation$: Observable<Venues>;
  venueDetails$: Observable<VenueDetails>;
  public markers$ = new BehaviorSubject<Marker[]>([]);
  constructor(private store: Store<Venues>) {}

  ngOnInit() {
    // Obtains observables that emit venue lists
    this.venues$ = this.store.pipe(select(VenuesSelector.getVenues));
    this.venuesAroundBusstation$ = this.store.pipe(
      select(VenuesSelector.getVenuesAroundBusstation)
    );
    this.venueDetails$ = this.store.pipe(select(VenuesSelector.getVenueDetails));
    // Dispatches actions to fetch venue lists
    this.store.dispatch(new VenuesAction.LoadVenuesAction());
    this.store.dispatch(new VenuesAction.LoadVenuesAroundBusstationAction());
    // Combines and subscribes to observables that emit venue lists
    combineLatest(this.venues$, this.venuesAroundBusstation$).subscribe(
      ([venues, venuesAroundBusstation]) => {
        if (venues && venuesAroundBusstation) {
          // Creates new array of filtered venues based on exclusion of venues around bus station
          const filteredVenues = venues.response.groups[0].items.filter(item => {
            return !venuesAroundBusstation.response.groups[0].items
              .map(innerItem => {
                return innerItem.venue.name === item.venue.name;
              })
              .reduce((accumulator, currentValue) => accumulator || currentValue);
          });
          // Dispatches actions to fetch venue details
          filteredVenues.map(item =>
            this.store.dispatch(new VenuesAction.LoadVenueDetailsAction(item.venue.id))
          );
        }
      }
    );
    // Subscribes to observables that emits venue details
    this.venueDetails$.subscribe(venueDetails => {
      if (venueDetails && venueDetails.response.venue) {
        // Composes data for each venue
        const getBestPhoto = photoCount => {
          if (photoCount === 0) {
            const tagWords: string[] = ['food', 'order', 'plate'];
            return (
              'https://source.unsplash.com/1600x900/?burger,' +
              tagWords[Math.floor(Math.random() * tagWords.length)]
            );
          } else {
            return (
              venueDetails.response.venue.bestPhoto.prefix +
              venueDetails.response.venue.bestPhoto.width +
              'x' +
              venueDetails.response.venue.bestPhoto.height +
              venueDetails.response.venue.bestPhoto.suffix
            );
          }
        };
        const marker: Marker = {
          latitude: venueDetails.response.venue.location.lat,
          longitude: venueDetails.response.venue.location.lng,
          imageUrl: getBestPhoto(venueDetails.response.venue.photos.count),
          title: venueDetails.response.venue.name,
          label: venueDetails.response.venue.name.charAt(0),
          icon:
            venueDetails.response.venue.categories[0].icon.prefix +
            'bg_44' +
            venueDetails.response.venue.categories[0].icon.suffix
        };
        // Emit each venue data from observer including all previous venues
        this.markers$.next(this.markers$.getValue().concat([marker]));
      }
    });
  }
}
