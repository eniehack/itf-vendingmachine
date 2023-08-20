import { writable, type Writable } from 'svelte/store';
import { LatLng } from 'leaflet';

export const here: Writable<LatLng> = writable(new LatLng(36.107, 140.1019));