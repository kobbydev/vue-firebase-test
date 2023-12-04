import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore(
	'user',
	() => {
		/*
		 *   STATE
		 */
		const user = ref({});
		/*
		 *   METHODS
		 */
		function saveUserData(userData) {
			user.value = { ...user.value, ...userData };
		}

		function logout() {
			user.value = {};
		}

		return { user, saveUserData, logout };
	},
	{
		// persisting pinia to localstorage using 'pinia-plugin-persistedstate'
		persist: true,
	}
);
