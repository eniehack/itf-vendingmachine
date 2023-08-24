import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel/serverless";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://itf-vendingmachine.vercel.app/",
  integrations: [svelte(), sitemap()],
  output: "server",
  adapter: vercel()
});