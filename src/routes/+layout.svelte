<script lang="ts">
	import Header from '$lib/Header.svelte';
</script>

<Header />

<main>
	<slot />
</main>

<svelte:head>
	<style>
		body {
			margin: 0;
			padding: 0;
  			font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;
		}
		html,
		body {
			height: 100%;
		}
	</style>
</svelte:head>
