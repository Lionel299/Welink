// router/index.js
import { createRouter, createWebHistory } from 'vue-router';

// Importez vos composants de page
import Home from '../components/Home.vue';
import About from '../components/About Us.vue';
import Contact from '../components/Contact.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
