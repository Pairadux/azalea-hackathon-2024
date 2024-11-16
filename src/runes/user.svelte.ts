export type User = {
	username: string | null;
	role: string | null;
};

export let currentUser = $state<User>({
    username: null,
    role: null,
})

export function setCurrentUser(user: User | null) {
    currentUser.username = user ? user.username : null;
    currentUser.role = user ? user.role : null;
}

export function getCurrentUser(): User | null {
    if (currentUser.username && currentUser.role) {
        return { username: currentUser.username, role: currentUser.role };
    } else {
        return null;
    }
}
