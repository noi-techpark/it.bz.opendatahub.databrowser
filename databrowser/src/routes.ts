import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { View, ViewKey } from './domain/datasetConfig/types';

declare module 'vue-router' {
  interface RouteMeta {
    viewKey?: ViewKey;
  }
}

export const DatasetPage: Record<Uppercase<ViewKey>, string> = {
  DETAIL: 'DatasetDetailPage',
  EDIT: 'DatasetEditPage',
  NEW: 'DatasetQuickNew',
  QUICK: 'DatasetQuickPage',
  RAW: 'DatasetRawPage',
  TABLE: 'DatasetTablePage',
} as const;

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./pages/HomePage.vue'),
    },
    {
      path: '/dataset/detail/:domain/:pathParams+/:id',
      component: () => import('./pages/DatasetPage.vue'),
      name: DatasetPage.DETAIL,
      meta: { viewKey: View.DETAIL },
    },
    {
      path: '/dataset/edit/:domain/:pathParams+/:id',
      component: () => import('./pages/DatasetPage.vue'),
      name: DatasetPage.EDIT,
      meta: { viewKey: View.EDIT },
    },
    {
      path: '/dataset/new/:domain/:pathParams+',
      component: () => import('./pages/DatasetPage.vue'),
      name: DatasetPage.NEW,
      meta: { viewKey: View.NEW },
    },
    {
      path: '/dataset/quick/:domain/:pathParams+/:id',
      component: () => import('./pages/DatasetPage.vue'),
      name: DatasetPage.QUICK,
      meta: { viewKey: View.QUICK },
    },
    {
      path: '/dataset/raw/:domain/:pathParams+/:id',
      component: () => import('./pages/DatasetPage.vue'),
      name: DatasetPage.RAW,
      meta: { viewKey: View.RAW },
    },
    {
      path: '/dataset/table/:domain/:pathParams+',
      component: () => import('./pages/DatasetPage.vue'),
      name: DatasetPage.TABLE,
      meta: { viewKey: View.TABLE },
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
  ],
});
