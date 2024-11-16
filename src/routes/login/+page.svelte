<script lang="ts">
	import { goto } from "$app/navigation";
    import { setCurrentUser } from "../../runes/user.svelte";

	type User = {
		username: string;
		password: string;
		role: string;
	};

	const accounts: User[] = [
		{ username: "Pepper", password: "password123", role: "doctor" },
		{ username: "Joker", password: "mypassword", role: "patient" },
		{ username: "Bob", password: "securepass", role: "doctor" },
		{ username: "Jeff", password: "anotherpass", role: "patient" }
	];

	let username = "";
	let password = "";

	function login(username: string, password: string) {
		const user = accounts.find((u) => u.username === username && u.password === password);

		if (user) {
            setCurrentUser({ username: user.username, role: user.role });
			return true;
		} else {
			console.log("Invalid username or password");
			return null;
		}
	}

	function handleLogin(event: Event) {
		event.preventDefault();
		if (login(username, password)) {
			goto("chat");
		} else {
            alert("Invalid username or password");
        }
	}
</script>

<div class="flex h-full w-full flex-col items-center p-12">
	<div class="h-[48rem] w-[36rem] bg-gray-200 dark:bg-gray-700 flex flex-col items-center justify-center">
		<h1 class="mb-32 text-center text-2xl font-bold text-black dark:text-white">Welcome Back!</h1>
		<form class="flex flex-col gap-8" on:submit|preventDefault={handleLogin}>
			<input
				type="text"
				placeholder="Username"
				bind:value={username}
                required
            />
			<input
				type="text"
				placeholder="Password"
				bind:value={password} 
                required
            />
			<button class="text-black dark:text-white" type="submit">Login</button>
		</form>
	</div>
</div>
