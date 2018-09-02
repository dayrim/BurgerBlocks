import { Component, OnInit, Input } from '@angular/core';
import { Marker } from '../models/markers';

@Component({
  selector: 'app-venueslist',
  templateUrl: 'venues-list.component.html',
  styleUrls: ['./venues-list.component.scss']
})
export class VenuesListComponent implements OnInit {
  title: string = 'Venues';
  @Input()
  markers: Marker[];
  constructor() {}
  ngOnInit() {}
}
