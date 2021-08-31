import { createRouter, createWebHistory } from 'vue-router';

import { RouterUtilities } from '../../src/index';

export const routes = new RouterUtilities([
	{
		path: '/auth',
		name: 'auth',
		component: () => import('./layouts/default.vue'),
		children: [
			{
				path: '',
				name: 'login',
				component: () => import('./pages/routeName.vue'),
			},
			{
				path: '/register',
				name: 'register',
				component: () => import('./pages/routeName.vue'),
			},
		],
	},
	{
		path: '/:location_id',
		component: () => import('./layouts/default.vue'),
		children: [
			{
				path: '',
				name: 'info',
				component: () => import('./pages/routeName.vue'),
			},
		],
	},
	{
		prefix: '/u/:user',
		children: [
			{
				path: '/profile',
				name: 'profile',
				component: () => import('./pages/routeName.vue'),
			},
			{
				path: '/stats',
				name: 'stats',
				component: () => import('./pages/routeName.vue'),
			},
		],
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'error',
		component: () => import('./pages/routeName.vue'),
	},
]);

console.log(routes);

const routerHistory = createWebHistory();
const router = createRouter({
	linkActiveClass: 'active',
	linkExactActiveClass: 'exact-active',
	history: routerHistory,
	routes: routes
});

export { router };
