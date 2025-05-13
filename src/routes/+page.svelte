<script lang="ts">
	import Article from '$lib/components/Article.svelte';
	import type { PageProps } from './$types';

    let { data }: PageProps = $props();
    let posts = $derived(data.posts ?? []);
    
</script>

{#each posts as post}
    <a href={post.path} class="hover:bg-gray-100 block"><Article data={post} /></a>
{:else}
    <span>Aucun article</span>
{/each}