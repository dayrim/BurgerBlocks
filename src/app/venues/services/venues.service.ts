import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Venues } from '../models/venues';
import { VenueDetails } from '../models/venueDetails';

@Injectable()
export class VenuesService {
  constructor(private http: HttpClient) {}

  getVenues(): Observable<Venues> {
    return this.http.get<Venues>('/api/venues').pipe(catchError(err => throwError(err)));
  }
  getVenuesAroundBusstation(): Observable<Venues> {
    return this.http
      .get<Venues>('/api/venues-around-busstation')
      .pipe(catchError(err => throwError(err)));
  }
  getVenueDetails(id: string): Observable<VenueDetails> {
    return this.http
      .get<VenueDetails>('/api/venue-details/' + encodeURI(id))
      .pipe(catchError(err => throwError(err)));
  }
}
