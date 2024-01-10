import { writable, type Writable } from 'svelte/store';
import maplibre from 'maplibre-gl';
const { LngLat } = maplibre;
import type { LngLat } from 'maplibre-gl';
import type { GeoJSONFeature } from './geojson';
import { VendingMachine } from './vendingMachine';
import { Popup, Marker, Map as MLMap } from 'maplibre-gl';

export const here: Writable<LngLat> = writable(new LngLat(140.1019, 36.107));

export const insertMarker = (map: MLMap, features: GeoJSONFeature[], el: HTMLDivElement) => {
	features.forEach((obj) => {
		let vm = new VendingMachine(obj);
		el.setAttribute('class', 'marker');
		/*
        el.style.backgroundImage = `url(http://${window.location.host}${BottleImage})`;
        el.style.width = "36px";
        el.style.height = "36px"; */
		const popup = new Popup().setHTML(vm.generatePopupText());
		//let m = new Marker({element: el})
		new Marker().setLngLat(obj.geometry.coordinates).setPopup(popup).addTo(map);
	});
};
