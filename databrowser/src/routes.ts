import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('./pages/Home.vue'),
    meta: {
      layout: 'AppLayoutDefault',
    },
  },
  {
    path: '/about',
    component: () => import('./pages/About.vue'),
  },
  {
    path: '/axios-example',
    component: () => import('./pages/AxiosExample.vue'),
  },
  {
    path: '/error',
    component: () => import('./pages/Error.vue'),
    meta: {
      layout: 'AppLayoutError',
    },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
