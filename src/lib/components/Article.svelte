<script lang="ts">
	let { data } = $props();
</script>

<article class="p-8 mx-auto max-w-2xl">
	<h1 class="text-2xl font-semibold">{data.meta.title}</h1>
	<span class="text-ash-400 text-lg">{data.meta.description}</span>
	<div class="text-gray-700 mt-8">
		<data.content />
		<style>
			h1 {
				font-size: 2rem;
			}
			
			/* customize ... */
		</style>
	</div>
</article>


