import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProfileView from '../views/ProfileView.vue';
import DashboardView from '../views/DashboardView.vue';
import DashboardLayout from '../layouts/DashboardLayout.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/signup-profile',
			name: 'signup',
			component: ProfileView,
		},
		{
			path: '/dashboard',
			name: 'dashboard',
			component: DashboardLayout,
			children: [
				{
					path: '',
					name: 'dashboard-view',
					component: DashboardView,
				},
			],
		},
		{
			path: '/about',
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import('../views/AboutView.vue'),
		},
		// {
		// 	path: '/signup-profile',
		// 	name: 'signup-profile',
		// 	component: () => import('../views/ProfileView.vue'),
		// },
	],
});

export default router;
