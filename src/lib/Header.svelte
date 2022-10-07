<header>
    <div class="menu__head">
        <h1><a href="/">筑波大学 自販機 Map</a></h1>
        <button class="hamberger" on:click="{() => active = !active}">
            <span class="hamburger-bar"></span>
            <span class="hamburger-bar"></span>
            <span class="hamburger-bar"></span>
        </button>
    </div>
    <nav class:active>
        <ul>
            <li><a href="/about">about</a></li>
            <li><a href="/contribute">このサイトに貢献する</a></li>
        </ul>
    </nav>
</header>


<style>
 h1 {
     margin-top: 0px;
     margin-bottom: 10px;
 }
 nav {
     display: none;
 }
 .active {
     display: block;
 }
 nav ul a {
     text-decoration: none;
     font-size: 17px;
     display: block;
 }
 nav ul a:hover {
     color:white;
 }
 nav ul {
     list-style-type:none;
 }
 button {
  border-color: transparent;
  background: transparent;
  cursor: pointer;
     width: 40px;
     height: 32px;
     position: relative;
     margin-top: 10px;
 }
 .hamburger-bar {
  display: block;
  width: 100%;
  height: 4px;
  position: absolute;
  left: 0;
  background: #000;
}

.hamburger-bar:nth-child(1) {
  top: 0;
}

.hamburger-bar:nth-child(2) {
  top: 50%;
  transform: translateY(-50%);
}

.hamburger-bar:nth-child(3) {
  top: 100%;
  transform: translateY(-100%);
}
 header .menu__head {
     display: flex;
     justify-content: space-between;
     padding-right: 10px;
     position: relative;
     overflow: hidden;
 }
</style>

<script lang="ts">
 import Hamburger from "$lib/Hamburger.svelte";
 let active = false;
</script>
