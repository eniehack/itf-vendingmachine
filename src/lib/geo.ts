import { readable } from "svelte/store";

export const here = readable(null, function start(set) {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            set(position.coords);
        });

        const coordWatchID = navigator.geolocation.watchPosition((position) => {
            console.log(position);
            set(position.coords);
        });

        return function stop() {
            navigator.geolocation.clearWatch(coordWatchID);
        }
    } else {
        return null;
    }
});
