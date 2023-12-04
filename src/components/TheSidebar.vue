<script setup>
import { signOut } from 'firebase/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authentication } from '../services/firebase.config';
import { useUserStore } from '../stores/user';

const props = defineProps(['user']);

const userProfileImage = ref(
	`https://api.dicebear.com/6.x/initials/svg?seed=${props.user?.fullName}&backgroundColor=039be5,00897b,8e24aa,d81b60&radius=50`
);

const router = useRouter();
const { logout } = useUserStore();

function handleLogout() {
	signOut(authentication)
		.then(() => {
			// Sign-out successful.
			logout();
			router.push('/');
		})
		.catch((error) => {
			// An error happened.
		});
}
</script>

<template>
	<section>
		<div class="menu">
			<div class="profile">
				<div class="profile-picture">
					<img :src="userProfileImage" alt="" />
				</div>
				<p class="user-name">
					{{ user?.fullName }}
				</p>
				<p class="user-email">{{ user?.email }}</p>
			</div>
			<div class="menu-links">
				<div class="links">
					<router-link to="/dashboard"
						><img src="../assets/icons/dashboard-icon.svg" alt="" />
						Dashboard</router-link
					>
				</div>
			</div>
			<div class="logout-btn" @click="handleLogout">
				<figure class="footer-image">
					<img src="../assets/icons/logout-icon.svg" alt="" />
				</figure>
				<span>Logout</span>
			</div>
		</div>
	</section>
</template>

<style scoped>
.profile {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: rgb(48, 165, 194);
	/* height: 25vh; */
	margin-bottom: 42px;
	/* padding: 75px 100px 38px 82px; */
	/* width: 292px; */
	height: 255px;
}
.profile-picture {
	border-radius: 50%;
	width: 80px;
	height: 80px;
	margin-bottom: 13px;
}
.profile-picture img {
	width: 80px;
	height: 80px;
	border-radius: 50%;
}
.links {
	margin-bottom: 28px;
}
.links img,
.logout-btn img {
	margin-right: 16px;
}
.logout-btn {
	display: flex;
	font-family: 'Lato';
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 19px;
	text-align: center;
	color: #2b3c4e;
	width: 100%;
	padding: 10px 23px;
	cursor: pointer;
}
a {
	text-decoration: none;
	font-family: 'Lato';
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 19px;
	text-align: center;
	color: #2b3c4e;
	width: 100%;
	padding: 0px 23px;
	margin-top: 28px;
	margin-bottom: 28px;
}
.user-name {
	font-family: 'Lato';
	font-style: normal;
	font-weight: 700;
	font-size: 20px;
	line-height: 24px;
	letter-spacing: -0.02em;
	color: #ffffff;
	margin-bottom: 5px;
}
.user-email {
	font-family: 'Lato';
	font-style: italic;
	font-weight: 400;
	font-size: 16px;
	line-height: 19px;
	letter-spacing: -0.02em;
	color: #ffffff;
}
a.router-link-exact-active {
	border-left: 4px solid rgb(48, 165, 194);
	padding-left: 19px;
	font-weight: 700;
}
#logout {
	margin-top: 10vh;
}
</style>
