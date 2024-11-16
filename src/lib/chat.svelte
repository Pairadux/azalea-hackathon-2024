<script lang="ts">
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import { io } from "socket.io-client";
	import { currentUser, getCurrentUser } from "../runes/user.svelte";

	let user = getCurrentUser();

	onMount(() => {
		if (!user) {
			goto("login");
		} else {
			initializeChat();
		}
	});

	let message = "";
	let messages: { username: string; text: string }[] = [
		// TEST: remove these before hackathon starts
		{ username: "Alice", text: "Hello, how are you?" },
		{ username: "Bob", text: "I'm good, thanks! How about you?" },
		{ username: "Charlie", text: "Just testing the chat app." },
		{ username: "Austin", text: "This is a message from me." }
	];
	let socket: any;
	let users: string[] = [];

	const initializeChat = () => {
		socket = io("http://localhost:3000");

		socket.emit("setUsername", user.username);

		socket.on("messageHistory", (history) => {
			messages = history;
		});

		socket.on("userList", (userList: string[]) => {
			users = userList;
		});

		socket.on("message", (data: { username: string; text: string }) => {
			messages = [...messages, data];
		});

		return () => {
			socket.disconnect();
		};
	};

	const sendMessage = () => {
		if (message.trim()) {
			socket.emit("message", message);
			message = "";
		}
	};
</script>

{#if user}
	<div class="chat-container box container">
		<h1 class="mb-2 text-2xl font-bold text-black dark:text-white">Welcome, {user.username}!</h1>
		<div class="user-list">
			<h2 class="text-black dark:text-white">Online Users</h2>
			<ul>
				{#each users as user}
					<li class="text-black dark:text-white">{user}</li>
				{/each}
			</ul>
		</div>
		<div class="messages flex h-[800px] flex-col gap-8 overflow-y-scroll p-4">
			{#each messages as msg}
				<div
					class="flex w-full"
					class:justify-end={msg.username === user.username}>
					<div class="leading-1.5 flex w-full max-w-[320px] flex-col border-gray-200 bg-gray-100 p-4 dark:bg-gray-700 {msg.username == user.username ? 'rounded-l-xl rounded-br-xl' : 'rounded-r-xl rounded-bl-xl'}">
						<div class="flex items-center space-x-2">
							<span class="text-sm font-semibold text-gray-900 dark:text-white">{msg.username}</span>
						</div>
						<p class="py-2.5 text-sm font-normal text-gray-900 dark:text-white">{msg.text}</p>
					</div>
				</div>
			{/each}
		</div>
		<div class="input-area">
			<input
				type="text"
				bind:value={message}
				placeholder="Type your message..."
				onkeydown={(e) => e.key === "Enter" && sendMessage()} />
			<button
				onclick={sendMessage}
				class="text-black dark:text-white">Send</button>
		</div>
	</div>
{:else}
	<p>Redirecting to login...</p>
{/if}

<style>
	/* Existing styles */
	.chat-container {
		max-height: 100%;
	}
	.username-container {
		margin-top: 50px;
	}
	.user-list {
		margin-bottom: 1rem;
	}
	.input-area {
		display: flex;
		margin-top: 1em;
	}
	.input-area input {
		flex: 1;
		padding: 0.5em;
	}
	.input-area button {
		padding: 0.5em 1em;
	}
</style>
