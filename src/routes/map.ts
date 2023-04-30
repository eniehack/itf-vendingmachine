import { browser, building } from "$app/environment";
import L, {type Map as LMap} from "leaflet";
import BottleImage from "$lib/assets/bottle.webp";
import { VendingMachine } from "$lib/vendingMachine";
import type { PageData } from "./$types";
import { here } from "$lib/geo";

export default (node: HTMLElement, data: PageData) => {
    if (!browser || building) return;
    let map: LMap = L.map(node).setView([36.107, 140.1019], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://osm.org">OpenStreetMap</a> contributors'
    }).addTo(map);

    let bottleIcon = L.icon({
        iconUrl: BottleImage,
        iconSize: [36, 36]
    });

    let vendingmachines: Array<VendingMachine> = [];
    data.nodes.forEach(elem => {
        vendingmachines.push(new VendingMachine(elem));
    });

    vendingmachines.forEach(vm => {
        let text = `<p>売っているもの: ${vm.getHumanizedVendingType()}</p><p>決済手段: ${vm.getHumanizedPaymentsType()}</p>`;
        let marker = L.marker(vm.getPosition(), { icon: bottleIcon }).addTo(map).bindPopup(text);
    });

    here.subscribe((coord) => {
        if (coord === undefined) return;
        //console.debug(coord);
        map.flyTo(coord);
    });

    return {
        destroy() {
            if (map) map.remove();
        }
    }
}