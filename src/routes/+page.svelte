<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type { Map as LFMap, LatLng } from 'leaflet';
	import { writable, type Writable } from 'svelte/store';
	import { VendingMachine } from '$lib/vendingMachine';
	import BottleImage from "$lib/assets/bottle.webp";
	import { base } from '$app/paths';
	import ogpImage from "$lib/assets/ogp.jpg";
	import { browser } from "$app/environment";
	import type { PageData } from './$types';	

	const vending = new Map<string, string>([
		['drinks', '飲料'],
		['food', '食品'],
		['ice_cream', 'アイスクリーム']
	]);

	let map: LFMap;
	let coordWatchID: number;
	let here: Writable<LatLng>;
	export let data: PageData;

	onMount(async () => {
		const L = await import('leaflet');
		let bottleIcon = L.icon({
			iconUrl: BottleImage,
			iconSize: [36, 36]
		});
		const { LatLng } = L;
		here = writable(new LatLng(36.107, 140.1019));
		map = L.map('map').setView([36.107, 140.1019], 13);
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '&copy; <a href="https://osm.org">OpenStreetMap</a> contributors'
		}).addTo(map);
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition((position) => {
				console.debug(position);
				here.set(new LatLng(position.coords.latitude, position.coords.longitude));
				map.flyTo($here);
			});
			coordWatchID = navigator.geolocation.watchPosition((position) => {
				console.debug(position);
				here.set(new LatLng(position.coords.latitude, position.coords.longitude));
			});
		}
		here.subscribe((coord) => {
			if (coord === null) return;
			//console.debug(coord);
		});
		data.features.forEach((obj) => {
			let vm = new VendingMachine(obj);
			let text = `<p>売っているもの: ${vm.getHumanizedVendingType()}</p><p>決済手段: ${vm.getHumanizedPaymentsType()}</p>`;
			let marker = L.marker(vm.getPosition(), { icon: bottleIcon }).addTo(map).bindPopup(text);
		});
	});

	onDestroy(() => {
		if (browser) {
			navigator.geolocation.clearWatch(coordWatchID);
		}
	});
</script>

<svelte:head>
	<title>筑波大学 自販機 Map</title>
	<meta name="og:title" content="筑波大学 自販機 Map" />
	<meta name="og:type" content="website" />
	<meta name="og:url" content="{base}/" />
	<meta name="og:locale" content="ja-JP" />
	<meta name="og:images" content={ogpImage} />
	<meta name="og:description" content="筑波大学構内の自動販売機の場所を一覧できるサイト" />
	<meta name="twitter:title" content="筑波大学 自販機 Map" />
	<meta name="twitter:description" content="筑波大学構内の自動販売機の場所を一覧できるサイト" />
	<meta name="twitter:creators" content="@eniehack" />
	<meta name="twitter:card" content="summary" />
	<link
		rel="stylesheet"
		href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
		integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
		crossorigin=""
	/>
</svelte:head>

<div id="map" />

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
