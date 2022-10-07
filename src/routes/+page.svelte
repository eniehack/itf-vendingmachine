<svelte:head>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
   integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
   crossorigin=""/>
</svelte:head>

<div id="map"></div>

{#await $here}
    <p>位置情報取得中</p>
{:catch error}
    <p>位置情報取得エラー(エラーコード: {error.code}): {error.message}</p>
{/await}

<style>
#map {
  height: 85vh;
  width: 100vw;
}
</style>

<script lang="ts">
 import { onDestroy, onMount } from "svelte";
 import L from "leaflet";
 import { LatLng, Map as LFMap } from "leaflet";
 import { here } from "$lib/geo";
 import { writable } from "svelte/store";
 import { VendingMachine } from "$lib/vendingMachine";

  const query: string = "[out:json][timeout:25]; \
way(id:183555030); \
map_to_area-> .ulis; \
way(id:183555029); \
map_to_area -> .ut; \
( \
  node(area.ulis)[amenity=vending_machine]; \
  node(area.ut)[amenity=vending_machine]; \
); \
out;";

const vending = new Map<string, string>([
    ["drinks", "飲料"],
    ["food", "食品"],
    ["ice_cream", "アイスクリーム"],
]);

let map: LFMap;
let coordWatchID: number;
 let json;

onMount(() => {
     map = L.map('map').setView([36.1070,140.1019], 13);
     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
         maxZoom: 19,
         attribution: '&copy; <a href="https://osm.org">OpenStreetMap</a> contributors'
     }).addTo(map);

     if ("geolocation" in navigator) {
         navigator.geolocation.getCurrentPosition((position) => {
             //console.debug(position);
             here.set(new LatLng(position.coords.latitude, position.coords.longitude));
         });

         coordWatchID = navigator.geolocation.watchPosition((position) => {
             //console.debug(position);
             here.set(new LatLng(position.coords.latitude, position.coords.longitude));
         });
     }

     here.subscribe(coord => {
         if (coord === null) return;
         //console.debug(coord);
         map.flyTo($here);
     });

     find_vendingmachine();
 });

 onDestroy(() => {
    navigator.geolocation.clearWatch(coordWatchID);
 })

const find_vendingmachine = async () => {
  /*
    let vm = localStorage.getItem("vm");
    if (vm !== null) {
        let json = JSON.parse(vm)
        return json.data;
    }
    */
    let resp = await fetch("https://lz4.overpass-api.de/api/interpreter", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/x-www-form-urlencode",
        },
        body: query,
    });

    if (resp.ok) {
        json = await resp.json();
        json["elements"].forEach(elem => {
            let m = new VendingMachine(elem);
            let text = `<p>売っているもの: ${m.getVending()}</p><p>決済手段: ${m.getPaymentsType().join(", ")}</p>`;
            let marker = L.marker([elem["lat"], elem["lon"]])
                          .addTo(map)
                          .bindPopup(text);
        });

      /*
        console.debug(json);
        localStorage.setItem("vm", JSON.stringify({
          data: json,
          inserted_at: (new Date()).toISOString(),
        }))
        */
        return json;
    } else {
        let text = await resp.text();
        window.alert("自動販売機データの取得に失敗しました");
        throw new Error(text);
    }
}

</script>
