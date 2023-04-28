import type { Config } from "@sveltejs/adapter-vercel";

export const ssr = false;
export const csr = true;
export const prerender = true;

export const config: Config = {
    runtime: "edge"
}