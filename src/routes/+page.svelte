<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	//import { VERCEL_URL } from "$env/static/private";
	import { Map as MLMap, GeolocateControl, NavigationControl } from 'maplibre-gl';
	import { here, insertMarker } from '$lib/geo';
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
	export let data: PageData;

	if (browser) {
		onMount(async () => {
			map = new MLMap({
				container: mapElem,
				style: 'https://tile.openstreetmap.jp/styles/osm-bright-ja/style.json',
				center: $here,
				zoom: 13
			});
			map.addControl(
				new GeolocateControl({
					positionOptions: {
						enableHighAccuracy: true
					},
					trackUserLocation: true
				})
			);
			map.addControl(new NavigationControl());

			/*
			const bottleIcon = icon({
				iconUrl: BottleImage,
				iconSize: [36, 36]
			});
			*/
			const el = document.createElement('div');
			insertMarker(map, data.features, el);
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
</svelte:head>

<div id="map" bind:this={mapElem} />

<style lang="scss">
	@import 'maplibre-gl/dist/maplibre-gl.css';
	#map {
		height: 85vh;
		width: 100vw;
	}
</style>
