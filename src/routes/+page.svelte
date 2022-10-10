<svelte:head>
 <title>筑波大学 自販機 Map</title>
</svelte:head>

<MetaTags
  title="筑波大学 自販機 Map"
  openGraph={{
    type: "website",
    url: base,
    title: "筑波大学 自販機 Map",
    description: "筑波大学構内の自動販売機の場所を一覧できるサイト",
    locale: "ja_JP",
    images: [
        {
            url: ogpImage,
        }
    ]
  }}
  twitter={{
    title: "筑波大学 自販機 Map",
    description: "筑波大学構内の自動販売機の場所を一覧できるサイト",
    handle: "@eniehack",
    cardType: "summary"
  }}
/>

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
 import { VendingMachine, vendingmachine } from "$lib/vendingMachine";
 import { MetaTags } from "svelte-meta-tags";
 import { base, assets } from "$app/paths";
  import ogpImage from "$lib/assets/ogp.jpg";
  import { browser } from "$app/environment";
  import LeafletCSS from "../../node_modules/leaflet/dist/leaflet.css";

const vending = new Map<string, string>([
    ["drinks", "飲料"],
    ["food", "食品"],
    ["ice_cream", "アイスクリーム"],
]);

let map: LFMap;
let coordWatchID: number;

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
    
    vendingmachine.subscribe(vms => {
      if (vms === undefined || map === undefined) return;
      vms.forEach(vm => {
        let text = `<p>売っているもの: ${vm.getVending()}</p><p>決済手段: ${vm.getPaymentsType().join(", ")}</p>`;
        let marker = L.marker(vm.getPosition())
                      .addTo(map)
                      .bindPopup(text);
      });
      return;
    });
    
    vendingmachine.subscribe(vms => {
      if (vms === undefined) return;
      
      let vm_arr: VendingMachine[] = [];
      vms.forEach(vm => {
        vm_arr.push(vm.toObject());
      });
      localStorage.setItem("vm", JSON.stringify({elements: vm_arr, created_at: (new Date).toISOString()}));
    });
  });
  
  onDestroy(() => {
    navigator.geolocation.clearWatch(coordWatchID);
  });

</script>
