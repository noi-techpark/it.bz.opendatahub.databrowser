import { createRouter, createWebHistory } from 'vue-router';
import { View, ViewKey } from './domain/datasetConfig/types';

export const DatasetPage: Record<Uppercase<ViewKey>, string> = {
  DETAIL: 'DatasetDetailPage',
  EDIT: 'DatasetEditPage',
  NEW: 'DatasetNewPage',
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
      component: () => import('./pages/datasets/DatasetDetailPage.vue'),
      name: DatasetPage.DETAIL,
    },
    {
      path: '/dataset/edit/:domain/:pathParams+/:id',
      component: () => import('./pages/datasets/DatasetEditPage.vue'),
      name: DatasetPage.EDIT,
    },
    {
      path: '/dataset/new/:domain/:pathParams+',
      component: () => import('./pages/datasets/DatasetEditPage.vue'),
      name: DatasetPage.NEW,
      meta: { viewKey: View.NEW },
    },
    {
      path: '/dataset/quick/:domain/:pathParams+/:id',
      component: () => import('./pages/datasets/DatasetQuickPage.vue'),
      name: DatasetPage.QUICK,
    },
    {
      path: '/dataset/raw/:domain/:pathParams+/:id',
      component: () => import('./pages/datasets/DatasetRawPage.vue'),
      name: DatasetPage.RAW,
    },
    {
      path: '/dataset/table/:domain/:pathParams+',
      component: () => import('./pages/datasets/DatasetTablePage.vue'),
      name: DatasetPage.TABLE,
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
      path: '/dataset-overview',
      component: () => import('./pages/datasets/overview/OverviewListPage.vue'),
      name: 'OverviewListPage',
    },
    {
      path: '/dataset-overview/:id',
      component: () =>
        import('./pages/datasets/overview/OverviewDetailPage.vue'),
      name: 'OverviewDetailPage',
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
});
