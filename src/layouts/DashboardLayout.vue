<script setup>
import TheSidebar from '../components/TheSidebar.vue';
import TheNavbar from '../components/TheNavbar.vue';
import { useUserStore } from '../stores/user';

/*
 * STATE
 */
const { user } = useUserStore();
</script>

<template>
	<div class="dashboard">
		<div class="left-section">
			<TheSidebar :user="user" />
		</div>
		<div class="right-section">
			<!-- <TheNavbar /> -->
			<div class="main-page"><RouterView /></div>
		</div>
	</div>
</template>

<style scoped>
.dashboard {
	display: flex;
}
.left-section {
	width: 20vw;
	background: #ffffff;
	box-shadow: 0px 5px 15px rgba(33, 31, 38, 0.05);
	position: relative;
	bottom: 0;
	height: 100vh;
}
.right-section {
    width: 100%;
    height: 100vh;
}
.main-page {
    height: 100%;
}
</style>
