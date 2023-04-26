import type { Config } from "@sveltejs/adapter-vercel";

export const ssr = false;
export const csr = true;
export const prerender = false;

export const config: Config = {
    runtime: "edge"
}