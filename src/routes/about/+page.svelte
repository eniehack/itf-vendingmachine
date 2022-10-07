<article>
    <h1>about</h1>
    <p></p>
</article>

<MetaTags
  title="about"
  titleTemplate="%s | 筑波大学 自販機 Map"
  openGraph={{
    type: "website",
    url: base,
    title: "about | 筑波大学 自販機 Map",
    description: "筑波大学構内の自動販売機の場所を一覧できるサイト",
    images: [
        {
            url: ogpImage,
        }
    ]
  }}
  twitter={{
    title: "筑波大学 自販機 Map",
    description: "筑波大学構内の自動販売機の場所を一覧できるサイト",
  }}
/>

<script lang="ts">
 import { MetaTags } from "svelte-meta-tags";
 import { base, assets } from "$app/paths";
  import ogpImage from "$lib/assets/ogp.jpg";
</script>
