<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import { base, assets } from '$app/paths';
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

<MetaTags
	title="about"
	titleTemplate="%s | 筑波大学 自販機 Map"
	openGraph={{
		type: 'website',
		url: base,
		title: 'about | 筑波大学 自販機 Map',
		description: '筑波大学構内の自動販売機の場所を一覧できるサイト',
		images: [
			{
				url: ogpImage
			}
		]
	}}
	twitter={{
		title: '筑波大学 自販機 Map',
		description: '筑波大学構内の自動販売機の場所を一覧できるサイト'
	}}
/>
