# 📝 Prerendered Blog with SvelteKit 2, Svelte 5, MDsveX 0.12.3 & Tailwind 4

Demo 👉 [blogmdsvex.vercel.app](https://blogmdsvex.vercel.app)

Repo 👉 [GitHub](https://github.com/Em-ilien/blogmdsvex)

This project demonstrates how to build a fully prerendered blog using:

-   SvelteKit 2
-   Svelte 5
-   MDsveX 0.12.3
-   Tailwind CSS 4

Most existing MDsveX tutorials and examples are still based on Svelte 4, so this repo aims to provide an up-to-date example for Svelte 5.

To build a prerendered blog with Svelte we can use MDsveX.

## 🚀 Getting Started

### 1. Create a new SvelteKit project

```bash
npx sv create
```

> For more context for the next steps, refer to [this commit](https://github.com/Em-ilien/blogmdsvex/commit/e4495b3dca3d609a8955bbaffb5a30c555c5f07d).

### 2. Add markdown content

Create a /content folder at the root of your project and place your markdown blog posts inside.
Each file should be named in kebab-case format like:

```
content/
├─ hello-world-intro.md
├─ my-second-post.md
```

### 3. Enable prerendering

Create a `/src/routes/+layout.server.ts` file with the following:

```ts
export const prerender = true;
```

### 4. Configure MDsveX

Update your [svelte.config.js](svelte.config.js) with the proper MDsveX setup and supported extensions:

```js
import { mdsvex } from "mdsvex";
// ...

const config = {
	preprocess: [vitePreprocess(), mdsvex({ extensions: [".md"] })],
	extensions: [".svelte", ".md"],
	// ...
};

export default config;
```

### 5. Create routes

Create these two routes:

**Home page (list of posts):**

-   [/src/routes/+page.ts](/src/routes/+page.ts)
-   [/src/routes/+page.svelte](/src/routes/+page.svelte)

**Post detail page (by slug):**

-   [/src/routes/[slug]/+page.ts](/src/routes/[slug]/+page.ts)
-   [/src/routes/[slug]/+page.svelte](/src/routes/[slug]/+page.svelte)

### 6. Run the project

```bash
npm run build
npm run preview
```

### 7. Development note (Vite file system access)

If you get errors accessing local markdown files in dev mode, update [vite.config.ts](vite.config.ts):

```js
export default defineConfig(({ mode }) => ({
	plugins: [tailwindcss(), sveltekit()],
	server: {
		fs: {
			allow: mode === "development" ? ["."] : [],
		},
	},
}));
```

⚠️ Important: Only allow . in development mode to avoid security issues in production.

## ✅ Summary

This template shows how to:

    Load markdown content at build time
    Use MDsveX to write posts in .md
    Generate static pages with prerender = true

## 🧠 Inspiration & License

Inspired by https://github.com/wiscaksono/wiscaksono-site ([wiscaksono](https://wiscaksono.com))

Feel free to fork and adapt this project. PRs are welcome.
Licensed under MIT.
