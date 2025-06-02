

import { createApp } from 'vue'
import App from './WebSite.vue'
import router from './router';



const app = createApp(App);
app.use(router); // Utilisez le routeur
app.mount('#app');