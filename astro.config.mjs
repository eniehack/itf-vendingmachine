import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: "https://itf-vendingmachine.vercel.app/",
  integrations: [svelte()],
  output: "server",
  adapter: vercel(),
});