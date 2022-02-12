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
		prefix: 'map',
		children: [
			{
				path: '/path',
				name: 'path',
				component: () => import('./pages/routeName.vue'),
			},
			{
				path: '/town/:stats_id',
				name: 'town',
				component: () => import('./pages/routeName.vue'),
				children: [
					{
						path: '',
						name: 'townhall',
						component: () => import('./pages/routeName.vue'),
						children: [
							{
								path: '/q/:quest_id',
								name: 'quest',
								component: () => import('./layouts/default.vue'),
								children: [
									{
										path: '',
										name: 'title',
										component: () => import('./pages/routeName.vue'),
									},
								],
							},
						],
					},
				],
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
		path: '/q/:quest_id',
		component: () => import('./layouts/default.vue'),
		children: [
			{
				path: '',
				name: 'title',
				component: () => import('./pages/routeName.vue'),
			},
		],
	},
	{
		path: '/u/:user_id',
		component: () => import('./layouts/default.vue'),
		children: [
			{
				path: '/test',
				name: 'test',
				component: () => import('./pages/routeName.vue'),
			},
			{
				path: '/stats/:stats_id',
				name: 'stats',
				component: () => import('./pages/routeName.vue'),
				children: [
					{
						path: '',
						name: 'overview',
						component: () => import('./pages/routeName.vue'),
					},
				],
			},
		],
	},
	{
		path: '/board',
		name: 'board',
		component: () => import('./layouts/default.vue'),
		children: [
			{
				path: '/:board_slug',
				name: 'slug',
				component: () => import('./pages/routeName.vue'),
				children: [
					{
						path: '',
						name: 'index',
						component: () => import('./pages/routeName.vue'),
					},
				],
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
