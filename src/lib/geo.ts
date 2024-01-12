import { writable, type Writable } from 'svelte/store';
import maplibre from "maplibre-gl";
const { LngLat } = maplibre;
import type { LngLat } from "maplibre-gl";

export const here: Writable<LngLat> = writable(new LngLat(140.1019, 36.107));
