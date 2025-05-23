import { mdsvex } from "mdsvex";
import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

const config = {
	preprocess: [vitePreprocess(), mdsvex({ extensions: [".md"] })],
	kit: {
		adapter: adapter(),
	},
	extensions: [".svelte", ".md"],
};

export default config;
