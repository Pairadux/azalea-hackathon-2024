<script lang="ts">
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import { getCurrentUser } from "../../runes/user.svelte";

    let user = getCurrentUser();

    $: user = getCurrentUser();

    onMount(() => {
        if (!user || user.role !== "doctor") {
            goto("login");
        }
    });
</script>

<h1 class="text-2xl text-black dark:text-white">Doctor's Notes</h1>
<p class="text-black dark:text-white">Welcome, Dr. {user.username}!</p>
<textarea
	id="patientNotes"
	name="patientNotes"
	rows="40"></textarea>
