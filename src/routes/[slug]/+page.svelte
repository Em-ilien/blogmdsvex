<script lang="ts">
  import Article from '$lib/components/Article.svelte';

	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
</script>

<Article {data} />
