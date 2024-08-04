import { createRouter, createWebHashHistory } from 'vue-router';
import ChatView from '@/views/ChatView.vue'; // Ensure this path is correct

const routes = [
  {
    path: '/',
    name: 'home',
    component: ChatView // Direct import, no lazy loading here
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/ProfileView.vue') // Lazy load the ProfileView component
  }
];

const router = createRouter({
  history: createWebHashHistory(), // Using hash history for routing
  routes
});

export default router;
