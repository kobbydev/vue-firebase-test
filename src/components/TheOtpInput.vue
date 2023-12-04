<script setup>
import { ref, watchEffect } from 'vue';

/*
 *   STATE
 */
const fields = ref(Array(6).fill(''));
const emit = defineEmits(['update:inputValue']);

/*
 *   METHODS
 */
function checkIfNumber(e) {
	let key = e.key;
	if (!/^[0-9]/g.test(key)) {
		e.preventDefault();
	}
}

function focusNext(e) {
	if (e.target.value !== '' && e.target.value.length === 1) {
		if (e.target.nextSibling.nodeName === 'INPUT') {
			e.target.nextSibling.focus();
		} else {
			e.preventDefault();
		}
	}
}

function focusPrevious(e) {
	// console.log(e.target.previousElementSibling);
	// if (e.target.value === '' && e.target.previousElementSibling) {
	// 	e.target.previousElementSibling.select();
	// 	e.target.previousElementSibling.focus();
	// }
	if (e.key === 'Backspace') {
		console.log('asdf');
		e.target.value = ''; // Clear the current input value

		if (e.target.previousSibling.nodeName === 'INPUT') {
			e.target.dispatchEvent(new Event('input')); // Trigger input event after clearing value
			const previousSibling = e.target.previousSibling;

			// Use setTimeout to ensure that the input value is cleared before focusing
			setTimeout(() => {
				previousSibling.focus();
			}, 0);
		}
	}
}

/*
 *   WATCHERS
 */
watchEffect(() => {
	emit('update:inputValue', fields.value.join(''));
});
</script>

<template>
	<div class="otp-input">
		<input
			v-for="(field, index) in fields"
			:key="field"
			v-model="fields[index]"
			@input="focusNext"
			@keypress="checkIfNumber"
			@keydown.delete="focusPrevious"
			onfocus="this.select()"
			maxlength="1"
			v-bind="$attrs"
		/>
	</div>
</template>

<style scoped>
.otp-input {
	display: flex;
	gap: 10px;
}

input {
	width: 35px;
	aspect-ratio: 1;
	outline: none;
	text-align: center;
}
</style>
