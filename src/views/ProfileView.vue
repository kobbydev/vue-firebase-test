<script setup>
import { ref } from 'vue';
import TheButton from '../components/TheButton.vue';
import { useUserStore } from '../stores/user';
import { useCreateUser } from '../composables/profile';

/*
 *   STATE
 */
const { user } = useUserStore();
const { createUser, loading } = useCreateUser();
const formFields = ref({
	fullName: '',
	email: '',
	phoneNumber: user?.phoneNumber || '',
	dob: '',
	isVerified: false,
});

/*
 *   METHODS
 */
function onSubmit() {
	if (
		!formFields.value.fullName ||
		!formFields.value.email ||
		!formFields.value.dob
	) {
		return false;
	}
	createUser(formFields.value);
}
</script>

<template>
	<main>
		<form>
			<p>Setup your account</p>
			<div class="form-input">
				<input
					type="text"
					placeholder="Enter your full name"
					v-model="formFields.fullName"
				/>
				<input
					type="email"
					placeholder="Enter your email"
					v-model="formFields.email"
				/>
				<input
					type="date"
					placeholder="Enter your first name"
					v-model="formFields.dob"
				/>
				<TheButton
					button-text="Continue"
					:disabled="
						!formFields.fullName || !formFields.email || !formFields.dob
					"
					:class="{
						disabled_btn:
							!formFields.fullName || !formFields.email || !formFields.dob,
						enabled_btn:
							formFields.fullName || formFields.email || formFields.dob,
					}"
					class="home-btn"
					@click.prevent="onSubmit"
					:loading="loading"
				/>
			</div>
		</form>
	</main>
</template>

<style scoped>
main {
	width: 100%;
	height: 100vh;
	display: grid;
	place-items: center;
}

form {
	background-color: aliceblue;
	padding: 30px 20px;
	border-radius: 10px;
	width: calc(100% - 30px);
	max-width: 400px;
	color: black;
}

.form-input {
	margin-top: 20px;
}

.phone_valid {
	border-bottom: 1px solid green;
}

.disabled_btn {
	cursor: not-allowed;
}
.disabled_btn:hover {
	opacity: 0.5;
	background: rgb(48, 165, 194);
}

.enabled_btn {
	opacity: 1;
}

.enabled_btn:hover {
	opacity: 1;
	background: rgb(48, 165, 194);
}

.home-btn {
	width: 100%;
	margin-top: 15px;
}

input {
	padding: 10px;
	/* border-radius: 8px; */
	border: none;
	width: 100%;
	border-bottom: 1px solid brown;
	background: transparent;
	font-size: 18px;
	outline: none;
}
</style>
