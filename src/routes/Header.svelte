<script lang="ts">
	import { currentUser } from "../runes/user.svelte";
	import { goto } from "$app/navigation";
</script>

<nav class="w-screen border-gray-200 bg-white drop-shadow-xl dark:bg-gray-900">
	<div class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
		<a
			href="/"
			class="flex items-center space-x-3 text-2xl dark:text-white">
			Valdosta Medical
		</a>
		<button
			data-collapse-toggle="navbar-default"
			type="button"
			class="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
			aria-controls="navbar-default"
			aria-expanded="false">
			<span class="sr-only">Open main menu</span>
			<svg
				class="h-5 w-5"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 17 14">
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M1 1h15M1 7h15M1 13h15" />
			</svg>
		</button>
		<div
			class="hidden w-full md:block md:w-auto"
			id="navbar-default">
			<ul class="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 dark:border-gray-700 dark:bg-gray-800 md:dark:bg-gray-900">
				<li>
					<a
						href="chat"
						class="block rounded bg-blue-700 px-3 py-2 text-white md:bg-transparent md:p-0 md:text-blue-700 dark:text-white md:dark:text-blue-500"
						aria-current="page">Chat</a>
				</li>
				<li>
					<a
						href="login"
						class="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500">Login</a>
				</li>
				{#if currentUser && currentUser.role === "doctor"}
					<li>
						<a
							href="notes"
							class="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500">Notes</a>
					</li>
				{/if}
			</ul>
		</div>
	</div>
</nav>
