import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('./pages/HomePage.vue'),
  },
  {
    path: '/dataset/:pathParams+',
    component: () => import('./pages/DatasetPage.vue'),
    name: 'DatasetTableAndDetailPage',
  },
  {
    path: '/dataset/:pathParams+/raw',
    component: () => import('./pages/DatasetPage.vue'),
    name: 'DatasetRawPage',
  },
  {
    path: '/dataset/:pathParams+/quick',
    component: () => import('./pages/DatasetPage.vue'),
    name: 'DatasetQuickPage',
  },
  {
    path: '/dataset/:pathParams+/edit',
    component: () => import('./pages/DatasetPage.vue'),
    name: 'DatasetEditPage',
  },
  {
    path: '/about',
    component: () => import('./pages/AboutPage.vue'),
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
  {
    path: '/links',
    component: () => import('./pages/DatasetLinkPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
