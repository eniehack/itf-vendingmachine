import { readable, type Readable } from "svelte/store";

//const getCurrentPosition: Promise<GeolocationPosition> = () => {
function getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((
        resolve: (value?: GeolocationPosition) => void,
        reject: (reason?: GeolocationPositionError) => void
    ) => {
        navigator.geolocation.getCurrentPosition((position) => {
            resolve(position);
        }, (err) => {
            reject(err);
        });
    })
}

//const initGeolocationAPI: Promise<GeolocationCoordinates> = async () => {
async function initGeolocationAPI() : Promise<GeolocationCoordinates>  {
    return (await getCurrentPosition())
                .then(pos => {
                    if (pos === null) return;
                    pos.coords
                })
                .catch(err => err.code)
            ;
}

function watchPosition(): [Promise<GeolocationPosition>, number] {
    let watchID: number;
    return [
        new Promise((
            resolve: (value?: GeolocationPosition) => void,
            reject: (reason?: GeolocationPositionError) => void
        ) => {
            watchID = navigator.geolocation.watchPosition((position) => {
                resolve(position);
            }, (err) => {
                reject(err);
                navigator.geolocation.clearWatch(watchID);
            });
        }),
        watchID
    ];
}

export const here: Readable<Promise<GeolocationCoordinates>> = readable(null, (set) => {
    const [watch, watchID] = watchPosition();

    set(watch.then(pos => pos.coords));

    return () => {
       navigator.geolocation.clearWatch(watchID);
    }
})
