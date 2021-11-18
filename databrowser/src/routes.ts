import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('./pages/HomePage.vue'),
    meta: {
      layout: 'AppLayoutDefault',
    },
  },
  {
    path: '/about',
    component: () => import('./pages/AboutPage.vue'),
  },
  {
    path: '/axios-example',
    component: () => import('./pages/AxiosExample.vue'),
  },
  {
    path: '/error',
    component: () => import('./pages/ErrorPage.vue'),
    meta: {
      layout: 'AppLayoutError',
    },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
