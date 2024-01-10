import type { Config } from '@sveltejs/adapter-vercel';

export const ssr = true;
export const csr = true;
export const prerender = true;

export const config: Config = {
	runtime: 'edge'
};
