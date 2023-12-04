import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { authentication, db } from '../services/firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

export function useFirebaseAuth() {
	/*
	 * STATE
	 */
	const router = useRouter();
	const requestLoading = ref(false);

	/*
	 * METHODS
	 */
	function generateRecaptcha() {
		window.recaptchaVerifier = new RecaptchaVerifier(
			authentication,
			'recaptcha-container',
			{
				size: 'invisible',
				callback: (response) => {
					// reCAPTCHA solved, allow signInWithPhoneNumber.
					// ...
				},
				'expired-callback': () => {
					// Response expired. Ask user to solve reCAPTCHA again.
					// ...
				},
			}
		);
	}

	function phoneNumberSignIn(phoneNumber) {
		requestLoading.value = true;
		let appVerifier = window.recaptchaVerifier;
		signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
			.then((confirmationResult) => {
				// SMS sent. Prompt user to type the code from the message, then sign the
				// user in with confirmationResult.confirm(code).
				window.confirmationResult = confirmationResult;
				// ...
			})
			.catch((error) => {
				// Error; SMS not sent
				// ...
				console.log(error);
				window.recaptchaVerifier.render().then(function (widgetId) {
					grecaptcha.reset(widgetId);
				});
			});
	}

	async function checkIfUserExists(uid) {
		const docRef = doc(db, 'users', uid);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			router.push('/dashboard');
		} else {
			// docSnap.data() will be undefined in this case
			router.push({ name: 'signup' });
		}
	}

	return {
		generateRecaptcha,
		phoneNumberSignIn,
		checkIfUserExists,
		requestLoading,
	};
}
