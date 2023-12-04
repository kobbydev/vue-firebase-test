<script setup>
import { computed, ref } from 'vue';
import TheButton from '../components/TheButton.vue';
import TheOtpInput from '../components/TheOtpInput.vue';
import TheModal from '../components/TheModal.vue';
import { useFirebaseAuth } from '../composables/auth';
import { useUserStore } from '../stores/user';

/*
 *   STATE
 */
const phoneNumber = ref('');
const pin = ref('');
const {
	generateRecaptcha,
	phoneNumberSignIn,
	checkIfUserExists,
	requestLoading,
} = useFirebaseAuth();
const { saveUserData } = useUserStore();
const openModal = ref(false);
const verificationLoading = ref(false);
// const authentication = getAuth();

/*
 *   COMPUTED PROPERTIES
 */
const isNumberValid = computed(() => {
	return phoneNumber.value.length === 13;
});
const isPinValid = computed(() => {
	return pin.value.length === 6;
});

/*
 *   METHODS
 */
function updatedPin(newValue) {
	pin.value = newValue;
}

function requestOTP() {
	generateRecaptcha();
	phoneNumberSignIn(phoneNumber.value);
	openModal.value = true;
}

function verifyOTP() {
	verificationLoading.value = true;
	let confirmationResult = window.confirmationResult;
	confirmationResult
		.confirm(pin.value)
		.then((result) => {
			// User signed in successfully.
			const user = result.user;
			// ...
			const { uid, accessToken, phoneNumber } = user;
			saveUserData({ uid, token: accessToken, phoneNumber });
			checkIfUserExists(uid);
			verificationLoading.value = false;
		})
		.catch((error) => {
			verificationLoading.value = false;
			// User couldn't sign in (bad verification code?)
			// ...
		});
}

function closeModal() {
	openModal.value = false;
}
</script>

<template>
	<main>
		<form>
			<p>Enter your phone number</p>
			<div class="form-input">
				<input
					type="text"
					placeholder="+233204567897"
					v-model="phoneNumber"
					:class="{ phone_valid: phoneNumber.length === 13 }"
				/>
				<TheButton
					button-text="Continue"
					:disabled="!isNumberValid"
					:class="{ disabled_btn: !isNumberValid, enabled_btn: isNumberValid }"
					class="home-btn"
					@click.prevent="requestOTP"
					:loading="requestLoading"
				/>
			</div>
		</form>
		<div id="recaptcha-container" class="recaptcha"></div>
		<TheModal v-if="openModal">
			<div class="otp-modal">
				<h3>OTP Verification</h3>
				<p>Enter the code you reveived to continue</p>
				<div class="otp-wrapper">
					<TheOtpInput @update:input-value="updatedPin" />
				</div>
				<TheButton
					button-text="Verify"
					:disabled="!isPinValid"
					:class="{
						disabled_btn: !isPinValid,
						enabled_btn: isPinValid,
					}"
					class="home-btn"
					@click.prevent="verifyOTP"
					:loading="verificationLoading"
				/>
			</div>
		</TheModal>
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

.recaptcha {
	position: absolute;
	bottom: 0;
	left: 0;
}

.otp-wrapper {
	width: 100%;
	margin: 0 auto;
	display: grid;
	place-items: center;
}

.otp-modal h3 {
	color: black;
	margin-bottom: 60px;
}

.otp-modal p {
	color: black;
	margin-bottom: 10px;
	text-align: center;
}
</style>
