<header>
    <nav>
        <div class="nav-wrapper">
            <a href="/" class="brand-logo center">筑波大学 自販機 Map</a>
            <a href="#" data-target="mobile-demo" class="sidenav-trigger">
                <i class="material-icons">menu</i>
            </a>
            <ul class="right hide-on-med-and-down" id="nav-mobile">
                <li><a href="/about">about</a></li>
                <li><a href="/contribute">このサイトに貢献する</a></li>
            </ul>
        </div>
    </nav>

    <ul class="sidenav" id="mobile-demo">
        <li><a href="/about">about</a></li>
        <li><a href="/contribute">このサイトに貢献する</a></li>
    </ul>
</header>

<script lang="ts">
  import "materialize-css/dist/css/materialize.min.css";
  import { browser } from "$app/environment";
 import { onMount } from "svelte";

 onMount(async () => {
    if (browser) {
      const M = await import("materialize-css/dist/js/materialize.min.js");
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems);
    }
 });
</script>
