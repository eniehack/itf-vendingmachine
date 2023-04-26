<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import 'leaflet/dist/leaflet.css';
	import L from 'leaflet';
	import { LatLng, type Map as LFMap } from 'leaflet';
	import { here } from '$lib/geo';
	import { VendingMachine } from '$lib/vendingMachine';
	import BottleImage from '$lib/assets/bottle.webp';
	import { MetaTags } from 'svelte-meta-tags';
	import { base } from '$app/paths';
	import ogpImage from '$lib/assets/ogp.jpg';
	import { browser } from '$app/environment';
	import type { PageData } from './$types';

	export let data: PageData;

	let map: LFMap;
	let coordWatchID: number;

	let bottleIcon = L.icon({
		iconUrl: BottleImage,
		iconSize: [36, 36]
	});

	onMount(() => {
		if (browser) {
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
				map.flyTo($here);
			});

			console.log(data);

			data.body.forEach((obj) => {
				let vm = new VendingMachine(obj);
				let text = `<p>売っているもの: ${vm.getHumanizedVendingType()}</p><p>決済手段: ${vm.getHumanizedPaymentsType()}</p>`;
				let marker = L.marker(vm.getPosition(), { icon: bottleIcon }).addTo(map).bindPopup(text);
			});
		}
	});

	onDestroy(() => {
		if (browser) {
			navigator.geolocation.clearWatch(coordWatchID);
		}
	});
</script>

<MetaTags
	title="筑波大学 自販機 Map"
	openGraph={{
		type: 'website',
		url: base,
		title: '筑波大学 自販機 Map',
		description: '筑波大学構内の自動販売機の場所を一覧できるサイト',
		locale: 'ja_JP',
		images: [
			{
				url: ogpImage
			}
		]
	}}
	twitter={{
		title: '筑波大学 自販機 Map',
		description: '筑波大学構内の自動販売機の場所を一覧できるサイト',
		handle: '@eniehack',
		cardType: 'summary'
	}}
/>

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
