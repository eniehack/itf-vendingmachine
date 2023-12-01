import { writable, type Writable } from 'svelte/store';
import { LngLat } from 'maplibre-gl';

export const here: Writable<LngLat> = writable(new LngLat(140.1019, 36.107));
