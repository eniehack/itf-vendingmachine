import { writable, type Writable } from 'svelte/store';
import { LatLng } from 'leaflet';
import { browser } from '$app/environment';

export const here: Writable<LatLng | undefined> = writable(undefined, () => {
    if (browser && 'geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            //console.debug(position);
            return (new LatLng(position.coords.latitude, position.coords.longitude));
        });
    }
});
