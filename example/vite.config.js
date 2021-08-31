import vue from '@vitejs/plugin-vue';

const config = {
	plugins: [
		vue(),
	],
	server: {
		port: 8080,
	},
};

export default config;