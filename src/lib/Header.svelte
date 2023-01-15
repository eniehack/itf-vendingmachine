<script lang="ts">
 	var is_navbar_toggled = false;
</script>

<style lang="scss">
@import "bulma/sass/utilities/controls.sass";
@import "bulma/sass/utilities/extends.sass";
@import "bulma/sass/components/navbar.sass";
</style>

<header>
	<nav class="navbar" role="navigation" aria-label="main navigation">
		<div class="navbar-brand">
			<a class="navbar-item" href="/">
				筑波大自販機Map
			</a>
			<span role="button"
				  class="navbar-burger"
				  aria-label="menu"
				  aria-expanded="false"
				  data-target="navbar-content"
				  class:is-active={is_navbar_toggled}
				  on:click="{() => is_navbar_toggled = !is_navbar_toggled}">
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
			</span>
		</div>
		<div id="navbar-content" class="navbar-menu" class:is-active={is_navbar_toggled}>
			<div class="navbar-start">
				<a href="/about" class="navbar-item">about</a>
				<a href="/contribute" class="navbar-item">このサイトに貢献する</a>
			</div>
			<div class="navbar-end">
				<a class="navbar-item" href="https://github.com/eniehack/itf-vendingmachine">GitHub</a>
			</div>
		</div>
	</nav>
</header>
