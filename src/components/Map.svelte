<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import 'leaflet/dist/leaflet.css';
	import L from 'leaflet';
	import { LatLng, type Map as LFMap } from 'leaflet';
	import { here } from '../lib/geo';
	import { VendingMachine } from '../lib/vendingMachine';
	import type { OSMObject } from "../pages/api/vm.json";

	export let endpoint: string;
	export let icon: string;

	let map: LFMap;
	let coordWatchID: number;

	let bottleIcon = L.icon({
		iconUrl: icon,
		iconSize: [36, 36]
	});

	onMount(async () => {
			//console.log(data);
			map = L.map('map').setView([36.107, 140.1019], 13);
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				maxZoom: 19,
				attribution: '&copy; <a href="https://osm.org">OpenStreetMap</a> contributors'
			}).addTo(map);

			if ('geolocation' in navigator) {
				navigator.geolocation.getCurrentPosition((position) => {
					//console.debug(position);
					here.set(new LatLng(position.coords.latitude, position.coords.longitude));
				});

				coordWatchID = navigator.geolocation.watchPosition((position) => {
					//console.debug(position);
					here.set(new LatLng(position.coords.latitude, position.coords.longitude));
				});
			}

			here.subscribe((coord) => {
				if (coord === null) return;
				//console.debug(coord);
				map.flyTo(coord);
			});

			let resp = await fetch(endpoint);
			console.log(resp.ok);
			if (!resp.ok) {
    			console.log("自動販売機データの取得に失敗しました,リロードしてください");
    			return;
				}
			let data: {nodes: OSMObject[]} = await resp.json();

			let vendingmachines: Array<VendingMachine> = [];
			data.nodes.forEach(elem => {
				vendingmachines.push(new VendingMachine(elem));
			});
			//console.log(vendingmachines);

			vendingmachines.forEach(vm => {
				let marker = L.marker(vm.getPosition(), { icon: bottleIcon })
					.addTo(map)
					.bindPopup(vm.generatePopupText());
			});
	});

	onDestroy(() => {
		navigator.geolocation.clearWatch(coordWatchID);
	});
</script>

<div class="map-container">
	<div id="map" />
</div>

{#await $here}
	<p>位置情報取得中</p>
{:catch error}
	<p>位置情報取得エラー(エラーコード: {error.code}): {error.message}</p>
{/await}

<style lang="scss">
	#map {
		position: absolute;
		top: 0;
		left: 0;
		height: 100% !important;
		width: 100% !important;
	}

	@import 'bulma/sass/utilities/mixins.sass';

	@include mobile {
		.map-container {
			position: relative;
			padding-bottom: 205%;
			height: 0;
			overflow: hidden;
		}
	}

	@include tablet-only {
		.map-container {
			position: relative;
			padding-bottom: 125%;
			height: 0;
			overflow: hidden;
		}
	}

	@include desktop {
		.map-container {
			position: relative;
			padding-bottom: 49%;
			height: 0;
			overflow: hidden;
		}
	}
</style>
