<script lang="ts">
	import { base, assets } from '$app/paths';
	import ogpImage from '$lib/assets/ogp.jpg';
	import { MetaTags } from 'svelte-meta-tags';
</script>

<article>
	<h1>このサイトへ貢献する</h1>
	<section>
		<h2>自動販売機の報告</h2>
		<p>
			このサイトでは、自動販売機のデータ、地図データを<a href="https://openstreetmap.org/"
				>OpenStreetMap</a
			>から取得しています。
			OpenStreetMapにユーザ登録をして、自動販売機のデータを追加することもできます。
		</p>

		<!--<p>
            または、Twitterハッシュタグ <a href="https://twitter.com/hashtag/itf_vendingmachine_map">#itf_vendingmachinemap</a> 、<a href="https://twitter.com/hashtag/%E7%AD%91%E6%B3%A2%E5%A4%A7%E5%AD%A6%E8%87%AA%E8%B2%A9%E6%A9%9FMap">#筑波大学自販機Map</a> を付けて投稿してください。その際は、「7A棟1F内」、「1A棟の1H棟・文サ館方面階段近く」などおおまかな場所を含め投稿してください。
        </p>-->
	</section>
	<section>
		<h2>開発に参加する</h2>
		<p>
			このサイトは<a href="https://github.com/eniehack/itf-vendingmachine">GitHub</a
			>にて、オープンソースソフトウェアとして公開されています。 Pull Request歓迎です。
		</p>
	</section>
	<section>
		<h2>バグ等の報告、機能の提案</h2>
		<p>
			<a href="https://github.com/eniehack/itf-vendingmachine/issues">GitHubのissue</a
			>から、または、Twitterハッシュタグ
			<a href="https://twitter.com/hashtag/itf_vendingmachine_map">#itf_vendingmachinemap</a>
			、<a
				href="https://twitter.com/hashtag/%E7%AD%91%E6%B3%A2%E5%A4%A7%E5%AD%A6%E8%87%AA%E8%B2%A9%E6%A9%9FMap"
				>#筑波大学自販機Map</a
			> を付けて投稿してください。
		</p>
	</section>
</article>

<MetaTags
	title="contribute"
	titleTemplate="%s | 筑波大学 自販機 Map"
	openGraph={{
		type: 'website',
		url: base,
		title: 'contribute | 筑波大学 自販機 Map',
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
