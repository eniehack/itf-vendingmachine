import { writable, type Writable } from 'svelte/store';
import type { LatLng } from 'leaflet';

export const here: Writable<LatLng> = writable();
