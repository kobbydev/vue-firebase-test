<script setup>
import TheSpinner from './TheSpinner.vue';
defineProps(['buttonText', 'loading']);
</script>

<template>
	<button>
		{{ buttonText }} <span v-if="loading"><TheSpinner /></span>
	</button>
</template>

<style scoped>
button {
	border-radius: 8px;
	padding: 15px 20px;
	background: rgb(71, 201, 233);
	opacity: 0.3;
	border: none;
	text-transform: uppercase;
	color: white;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
}

button:hover {
	opacity: 1;
}

span {
	max-height: 20px;
}
</style>
