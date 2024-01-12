<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Map as MLMap, Marker, Popup, LngLat } from 'maplibre-gl';
	import { here } from '$lib/geo';
	import { VendingMachine } from '$lib/vendingMachine';
	//import BottleImage from "$lib/assets/bottle.png";
	import { base } from '$app/paths';
	import ogpImage from '$lib/assets/ogp.jpg';
	import { browser } from '$app/environment';
	import type { PageData } from './$types';

	const vending = new Map<string, string>([
		['drinks', '飲料'],
		['food', '食品'],
		['ice_cream', 'アイスクリーム']
	]);

	let map: MLMap;
	let mapElem: HTMLDivElement;
	let coordWatchID: number;
	export let data: PageData;

	if (browser) {
		onMount(async () => {
			map = new MLMap({
				container: mapElem,
				style: 'https://tile.openstreetmap.jp/styles/osm-bright-ja/style.json',
				center: [140.1019, 36.107],
				zoom: 13
			});
			/*
			const bottleIcon = icon({
				iconUrl: BottleImage,
				iconSize: [36, 36]
			});
			*/
			if ('geolocation' in navigator) {
				navigator.geolocation.getCurrentPosition((position) => {
					console.debug(position);
					here.set(new LngLat(position.coords.longitude, position.coords.latitude));
					//map.flyTo($here);
				});
				coordWatchID = navigator.geolocation.watchPosition((position) => {
					console.debug(position);
					here.set(new LngLat(position.coords.longitude, position.coords.latitude));
				});
			}
			here.subscribe((coord) => {
				if (coord === null) return;
				//console.debug(coord);
			});
			console.log(data);
			data.features.forEach((obj) => {
				let vm = new VendingMachine(obj);
				const el = document.createElement('div');
				el.setAttribute('class', 'marker');
				/*
				el.style.backgroundImage = `url(http://${window.location.host}${BottleImage})`;
				el.style.width = "36px";
				el.style.height = "36px"; */
				const popup = new Popup().setHTML(vm.generatePopupText());
				//let m = new Marker({element: el})
				new Marker().setLngLat(obj.geometry.coordinates).setPopup(popup).addTo(map);
			});
		});

		onDestroy(() => {
			navigator.geolocation.clearWatch(coordWatchID);
		});
	}
</script>

<svelte:head>
	<title>筑波大学 自販機 Map</title>
	<meta name="og:title" content="筑波大学 自販機 Map" />
	<meta name="og:type" content="website" />
	<meta name="og:url" content={base} />
	<meta name="og:locale" content="ja-JP" />
	<meta name="og:images" content={ogpImage} />
	<meta name="og:description" content="筑波大学構内の自動販売機の場所を一覧できるサイト" />
	<meta name="twitter:title" content="筑波大学 自販機 Map" />
	<meta name="twitter:description" content="筑波大学構内の自動販売機の場所を一覧できるサイト" />
	<meta name="twitter:creators" content="@eniehack" />
	<meta name="twitter:card" content="summary" />
	<link rel="stylesheet" href="https://unpkg.com/maplibre-gl@3.6.2/dist/maplibre-gl.css" />
</svelte:head>

<div id="map" bind:this={mapElem} />

<style>
	#map {
		height: 85vh;
		width: 100vw;
	}
</style>
