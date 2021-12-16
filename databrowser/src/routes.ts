import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('./pages/HomePage.vue'),
  },
  {
    path: '/dataset/:datasetType',
    component: () => import('./pages/datasets/TableViewPage.vue'),
    name: 'DatasetsTableViewPage',
  },
  {
    path: '/dataset/:datasetType/:datasetId',
    component: () => import('./pages/datasets/DetailViewPage.vue'),
    name: 'DatasetsDetailViewPage',
  },
  {
    path: '/dataset/:datasetType/:datasetId/raw',
    component: () => import('./pages/datasets/RawViewPage.vue'),
    name: 'DatasetsRawViewPage',
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
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
