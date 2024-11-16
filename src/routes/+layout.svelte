<script lang="ts">
	import Header from "./Header.svelte";

	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col bg-white dark:bg-gray-900">
	<div class="flex flex-grow flex-col items-center">
		<Header />

		<main class="border-box container flex w-full flex-1 flex-col p-4">
			{@render children()}
		</main>
	</div>

	<footer class="p-12 text-center">
		<div class="">
			<p class="text-2xl text-black dark:text-white">Team Pklball Telehealth App</p>
		</div>
	</footer>
</div>
