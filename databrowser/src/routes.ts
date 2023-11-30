// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { createRouter, createWebHistory } from 'vue-router';
import { ViewKey } from './domain/datasets/config/types';

export const DatasetPage: Record<Uppercase<ViewKey>, string> = {
  DETAIL: 'DatasetDetailPage',
  EDIT: 'DatasetEditPage',
  NEW: 'DatasetNewPage',
  QUICK: 'DatasetQuickPage',
  RAW: 'DatasetRawPage',
  TABLE: 'DatasetTablePage',
} as const;

// TODO: remove unused paths and associated pages

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./pages/HomePage.vue'),
    },
    {
      path: '/dataset/detail/:domain/:pathSegments+/:id',
      component: () => import('./pages/datasets/DatasetDetailPage.vue'),
      name: DatasetPage.DETAIL,
    },
    {
      path: '/dataset/edit/:domain/:pathSegments+/:id',
      component: () => import('./pages/datasets/DatasetEditPage.vue'),
      name: DatasetPage.EDIT,
    },
    {
      path: '/dataset/new/:domain/:pathSegments+',
      component: () => import('./pages/datasets/DatasetNewPage.vue'),
      name: DatasetPage.NEW,
    },
    {
      path: '/dataset/quick/:domain/:pathSegments+/:id',
      component: () => import('./pages/datasets/DatasetQuickPage.vue'),
      name: DatasetPage.QUICK,
    },
    {
      path: '/dataset/raw/:domain/:pathSegments+/:id',
      component: () => import('./pages/datasets/DatasetRawPage.vue'),
      name: DatasetPage.RAW,
    },
    {
      path: '/dataset/table/:domain/:pathSegments+',
      component: () => import('./pages/datasets/DatasetTablePage.vue'),
      name: DatasetPage.TABLE,
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
