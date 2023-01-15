<script lang="ts">
	import Header from '$lib/Header.svelte';
</script>

<Header />

<main>
	<slot />
</main>

<style lang="scss">
@import "bulma/sass/base/_all.sass";
@import "bulma/sass/utilities/_all.sass";
@import "bulma/sass/helpers/_all.sass";
</style>
