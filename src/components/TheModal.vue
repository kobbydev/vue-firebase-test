<script setup>
defineEmits('closeModal');
</script>

<template>
	<div class="modal">
		<div class="modal-background" @click="$emit('closeModal')"></div>
		<div class="modal-content">
			<slot></slot>
		</div>
	</div>
</template>

<style scoped>
.modal {
	/* position: absolute;
    top: 30% */
}
.modal-background {
	width: 100vw;
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.3);
	display: flex;
	justify-content: flex-end;
	z-index: 1;
	/* align-items: center; */
}
.modal-content {
	background: #ffffff;
	position: absolute;
	right: 0;
	left: 0;
	top: 30%;
	border-radius: 8px;
	z-index: 4;
	padding: 30px 20px;
	width: calc(100% - 30px);
	max-width: 600px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
}

@media screen and (min-width: 600px) {
	.modal-content {
		right: calc(50% - 300px);
		left: calc(50% - 300px);
		padding: 50px;
		/* width: 600px; */
	}
}
</style>
