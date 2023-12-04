import { doc, setDoc } from 'firebase/firestore';
import { useUserStore } from '../stores/user';
import { db } from '../services/firebase.config';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

export function useCreateUser() {
	/*
	 *   STATE
	 */
	const { user, saveUserData } = useUserStore();
	const router = useRouter();
	const loading = ref(false);

	/*
	 *   METHODS
	 */
	async function createUser(payload) {
		loading.value = true;
		try {
			loading.value = true;
			await setDoc(doc(db, 'users', user?.uid), payload);
			saveUserData(payload);
			router.push({ name: 'dashboard-view' });
			loading.value = false;
		} catch (error) {
			loading.value = false;
			console.log(error);
		}
	}

	return { createUser, loading };
}
