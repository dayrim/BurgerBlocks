export interface Meta {
  code: number;
  requestId: string;
}

export interface Filter {
  name: string;
  key: string;
}

export interface SuggestedFilters {
  header: string;
  filters: Filter[];
}

export interface Ne {
  lat: number;
  lng: number;
}

export interface Sw {
  lat: number;
  lng: number;
}

export interface SuggestedBounds {
  ne: Ne;
  sw: Sw;
}

export interface Item2 {
  summary: string;
  type: string;
  reasonName: string;
}

export interface Reasons {
  count: number;
  items: Item2[];
}

// tslint:disable-next-line:no-empty-interface
export interface Contact {}

export interface LabeledLatLng {
  label: string;
  lat: number;
  lng: number;
}

export interface Location {
  address: string;
  lat: number;
  lng: number;
  labeledLatLngs: LabeledLatLng[];
  distance: number;
  postalCode: string;
  cc: string;
  city: string;
  state: string;
  country: string;
  formattedAddress: string[];
  crossStreet: string;
}

export interface Icon {
  prefix: string;
  suffix: string;
}

export interface Category {
  id: string;
  name: string;
  pluralName: string;
  shortName: string;
  icon: Icon;
  primary: boolean;
}

export interface Stats {
  tipCount: number;
  usersCount: number;
  checkinsCount: number;
  visitsCount: number;
}

export interface BeenHere {
  count: number;
  lastCheckinExpiredAt: number;
  marked: boolean;
  unconfirmedCount: number;
}

export interface Photos {
  count: number;
  groups: any[];
}

export interface HereNow {
  count: number;
  summary: string;
  groups: any[];
}

export interface Venue {
  id: string;
  name: string;
  contact: Contact;
  location: Location;
  categories: Category[];
  verified: boolean;
  stats: Stats;
  beenHere: BeenHere;
  photos: Photos;
  hereNow: HereNow;
}

export interface Flags {
  outsideRadius: boolean;
}

export interface Item {
  reasons: Reasons;
  venue: Venue;
  referralId: string;
  flags: Flags;
}

export interface Group {
  type: string;
  name: string;
  items: Item[];
}

export interface Response {
  suggestedFilters: SuggestedFilters;
  suggestedRadius: number;
  headerLocation: string;
  headerFullLocation: string;
  headerLocationGranularity: string;
  query: string;
  totalResults: number;
  suggestedBounds: SuggestedBounds;
  groups: Group[];
}

export interface Venues {
  meta: Meta;
  response: Response;
}
