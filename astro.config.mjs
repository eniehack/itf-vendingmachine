import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel/serverless";
import vercelEdge from "@astrojs/vercel/edge";
import sitemap from "@astrojs/sitemap";

let config;
if (import.meta.env.DEV) {
  config = {
    site: "http://127.0.0.1:3000/",
    integrations: [svelte(), sitemap()],
    adapter: vercel(),
    output: 'server'
  };
} else {
  config = {
    site: "https://itf-vendingmachine.vercel.app/",
    integrations: [ svelte(), sitemap()],
    adapter: vercelEdge(),
    output: 'server'
  };
}

// https://astro.build/config
export default defineConfig(config);