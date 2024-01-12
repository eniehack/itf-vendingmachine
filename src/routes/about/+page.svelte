<script lang="ts">
	import { base } from '$app/paths';
	import ogpImage from '$lib/assets/ogp.jpg';
</script>

<article>
	<h1>about</h1>
	<section>
		<h1>地図、自販機データの出典</h1>
		<p>
			地図データ、自動販売機データ共に<a href="https://openstreetmap.org">OpenStreetMap</a
			>を利用しています。 OSMの提供するデータはODbLの下にライセンスされます。 詳細は<a
				href="https://www.openstreetmap.org/copyright">こちら</a
			>をご覧ください
		</p>
	</section>
</article>

<svelte:head>
	<title>筑波大学 自販機 Map</title>
	<meta name="og:title" content="about | 筑波大学 自販機 Map" />
	<meta name="og:type" content="website" />
	<meta name="og:url" content="{base}/" />
	<meta name="og:locale" content="ja_JP" />
	<meta name="og:images" content={ogpImage} />
	<meta name="og:description" content="筑波大学構内の自動販売機の場所を一覧できるサイト" />
	<meta name="twitter:title" content="about | 筑波大学 自販機 Map" />
	<meta name="twitter:description" content="筑波大学構内の自動販売機の場所を一覧できるサイト" />
	<meta name="twitter:creators" content="@eniehack" />
	<meta name="twitter:card" content="summary" />
</svelte:head>
