import adapter from '@sveltejs/adapter-vercel';
import sveltePreprocess from 'svelte-preprocess';
import purgecss from '@fullhuman/postcss-purgecss';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		sveltePreprocess({
			postcss: {
				plugins: [
					purgecss({
						content: ['./src/**/*.html', './src/**/*.svelte'],
						whitelistPatterns: [/svelte-/],
						defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || []
					})
				]
			}
		})
	],

	kit: {
		adapter: adapter({
			split: true
		})
	}
};

export default config;
