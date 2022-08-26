<svelte:head>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
   integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
   crossorigin=""/>
</svelte:head>

<div id="map"></div>

{#await $here}
    <p>位置情報取得中</p>
{:then coord}
    <!--<p>{coord.longitude},{coord.latitude}</p>-->
    {coord}
{:catch error}
    Error({error.code}): {error.message}
{/await}

{#await find_vendingmachine()}
    waiting...
{:then result}
{#each result.elements as elem}
    <section>
        <h1 id="{elem.id}">自動販売機</h1>
        <a href="geo:{elem.lat},{elem.lon}">geo URI</a>
        <p>取り扱っているもの: {vending.get(elem.tags.vending)}
    </section>
{/each}
<p>データは{result.osm3s.timestamp_areas_base}頃のものです</p>
<p>{result.osm3s.copyright}</p>
{:catch error}
<p style="color: red">{error.message}</p>
{/await}

<style>
#map {
  width: 500px;
  height: 500px;
}
</style>

<script lang="ts">
 import { onDestroy, onMount } from "svelte";
 import L from "leaflet";
 import { here } from "./geo";

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

let map;
 let unsubscribeCoords;

onMount(() => {
     map = L.map('map').setView([36.1070,140.1019], 13);
     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
         maxZoom: 19,
         attribution: '&copy; <a href="https://osm.org">OpenStreetMap</a> contributors'
     }).addTo(map);

     unsubscribeCoords = here.subscribe(coord => {
         if (coord === null) return;
         console.log(coord);
         map.setview([coord.latitude, coord.longitude]);
     })
 });

 onDestroy(unsubscribeCoords);

const find_vendingmachine = async () => {
    let resp = await fetch("https://lz4.overpass-api.de/api/interpreter", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/x-www-form-urlencode",
        },
        body: query,
    });

    if (resp.ok) {
        let json = await resp.json();
        json["elements"].forEach(elem => {
            L.marker([elem["lat"], elem["lon"]])
             .addTo(map)
             .bindPopup(`<a href="#${elem["id"]}">vd</a>`);
        });

        console.log(json);
        return json;
    } else {
        let text = await resp.text();
        throw new Error(text);
    }
}


</script>
