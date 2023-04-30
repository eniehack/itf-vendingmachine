<script lang="ts">
	import { here } from '$lib/geo';
	import { VendingMachine } from '$lib/vendingMachine';
	import BottleImage from '$lib/assets/bottle.webp';
	import { MetaTags } from 'svelte-meta-tags';
	import { base } from '$app/paths';
	import ogpImage from '$lib/assets/ogp.jpg';
	import type { PageData } from './$types';
	import L, { type Map as LMap } from "leaflet";
	import 'leaflet/dist/leaflet.css';

	export let data: PageData;

	const map_init = (node: HTMLElement) => {
		//console.log(data);
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
	<div use:map_init id="map" />
</div>

{#await $here}
	<p>位置情報取得中</p>
{:catch error}
	<p>位置情報取得エラー(エラーコード: {error.code}): {error.message}</p>
{/await}

<style lang="scss">
	@use 'bulma/sass/utilities/mixins.sass' as util;

	#map {
		position: absolute;
		top: 0;
		left: 0;
		height: 100% !important;
		width: 100% !important;
	}

	@include util.mobile {
		.map-container {
			position: relative;
			padding-bottom: 205%;
			height: 0;
			overflow: hidden;
		}
	}

	@include util.tablet-only {
		.map-container {
			position: relative;
			padding-bottom: 125%;
			height: 0;
			overflow: hidden;
		}
	}

	@include util.desktop {
		.map-container {
			position: relative;
			padding-bottom: 49%;
			height: 0;
			overflow: hidden;
		}
	}
</style>
