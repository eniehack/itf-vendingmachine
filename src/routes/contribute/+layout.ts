import type { Config } from '@sveltejs/adapter-vercel';

export const ssr = true;
export const prerender = true;

export const config: Config = {
	runtime: 'nodejs18.x'
};
