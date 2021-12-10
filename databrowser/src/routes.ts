import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
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
  {
    path: '/dataset/:datasetType',
    component: () => import('./pages/DatasetPage.vue'),
  },
  {
    path: '/dataset/:datasetType/:datasetId',
    component: () => import('./pages/DatasetDetailPage.vue'),
    name: 'datasetDetailPage',
  },
  {
    path: '/dataset/:datasetType/:datasetId/raw',
    component: () => import('./pages/DatasetRawPage.vue'),
    name: 'datasetRawPage',
  },
  {
    path: '/dataset/:datasetType/:datasetId/raw',
    component: () => import('./pages/DatasetRawPage.vue'),
  },
  {
    path: '/imprint',
    component: () => import('./pages/ImprintPage.vue'),
  },
  {
    path: '/legal',
    component: () => import('./pages/LegalPage.vue'),
  },
  {
    path: '/privacy',
    component: () => import('./pages/PrivacyPage.vue'),
  },
  {
    path: '/sitemap',
    component: () => import('./pages/SitemapPage.vue'),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
