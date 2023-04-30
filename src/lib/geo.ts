import { readable, type Readable } from 'svelte/store';
import { LatLng } from 'leaflet';
import { browser } from '$app/environment';

export const here: Readable<LatLng | undefined> = readable(undefined, set => {
    if (browser && 'geolocation' in navigator) {
        const coordWatchID = navigator.geolocation.watchPosition((position) => {
            console.debug(position);
            set(new LatLng(position.coords.latitude, position.coords.longitude));
        });
        return () => navigator.geolocation.clearWatch(coordWatchID);
    }
});
