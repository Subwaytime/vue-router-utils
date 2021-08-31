import App from './app.vue';
import { createApp } from 'vue';
import { router } from './router';

const instance = createApp(App);
instance.use(router);
instance.mount('#app');
