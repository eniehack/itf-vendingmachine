import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel/serverless";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
    site: import.meta.env.DEV ? "http://localhost:3000" : `https://${process.env.VERCEL_URL}`,
  integrations: [svelte(), sitemap()],
  output: "server",
  adapter: vercel()
});
