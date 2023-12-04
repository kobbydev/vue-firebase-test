<script setup>
import TheButton from '../components/TheButton.vue';
import axios from 'axios';
import { useUserStore } from '../stores/user';
import { ref } from 'vue';

/*
 * STATE
 */
const { user } = useUserStore();
const loading = ref(false);

// demonstrating how to pass authorization token to an external api through headers using axios
function onVerify() {
	loading.value = true;
	const response = axios.post(
		'https://example.com/api/user',
		{
			fullname: user?.fullName,
			email: user?.email,
		},
		{ headers: { Authorization: user?.token } }
	);
	console.log(response);
}
</script>

<template>
	<main>
		<div>
			<div class="card">
				<p>Verify your account to continue</p>
				<TheButton
					button-text="Verify"
					class="verify-btn"
					:loading="loading"
					@click="onVerify"
				/>
			</div>
		</div>
	</main>
</template>

<style scoped>
main {
	width: 100%;
	height: 100%;
	display: grid;
	place-items: center;
}

.card {
	box-shadow: 10px 10px 20px -11px rgba(0, 0, 0, 0.62);
	padding: 20px;
	min-height: 100px;
	display: grid;
	place-items: center;
	gap: 20px;
}

.verify-btn {
	opacity: 1;
}
</style>
