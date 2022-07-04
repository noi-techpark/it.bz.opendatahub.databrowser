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
    meta: { resolveViewConfig: true },
  },
  {
    path: '/dataset/:pathParams+/raw',
    component: () => import('./pages/DatasetPage.vue'),
    name: 'DatasetRawPage',
    meta: { resolveViewConfig: true },
  },
  {
    path: '/dataset/:pathParams+/quick',
    component: () => import('./pages/DatasetPage.vue'),
    name: 'DatasetQuickPage',
    meta: { resolveViewConfig: true },
  },
  {
    path: '/dataset/:pathParams+/edit',
    component: () => import('./pages/DatasetPage.vue'),
    name: 'DatasetEditPage',
    meta: { resolveViewConfig: true },
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
