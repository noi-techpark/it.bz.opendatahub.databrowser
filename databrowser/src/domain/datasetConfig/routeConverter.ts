// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { RouteLocationNormalizedLoaded } from 'vue-router';
import {
  DatasetDomain,
  DatasetLocation,
  DatasetPath,
  ViewFlags,
  ViewKey,
} from './types';
import { domainIsKnownToHaveOpenApiDocument } from '../openApi';
import { DatasetPage } from '../../routes';

export const computeDatasetLocation = (
  route: RouteLocationNormalizedLoaded
): DatasetLocation => {
  const domain = computeDatasetDomain(route.params.domain);
  const path = computeDatasetPath(route);
  return { domain, ...path };
};

export const computeDatasetDomain = (
  domainCandidate: string | string[] | null | undefined
): DatasetDomain => {
  if (domainCandidate == null || Array.isArray(domainCandidate)) {
    return 'no-dataset-domain-in-url';
  }
  return domainIsKnownToHaveOpenApiDocument(domainCandidate)
    ? domainCandidate
    : 'unknown';
};

export const computeDatasetPath = (
  route: RouteLocationNormalizedLoaded
): DatasetPath => {
  const pathParams = computePathParams(route);
  const pathId = computePathId(route);
  return { pathParams, pathId };
};

const computePathParams = (route: RouteLocationNormalizedLoaded): string[] => {
  const path = route.params.pathParams;
  if (path == null) {
    return [];
  }

  // Ensure to use an array as pathParams
  return Array.isArray(path) ? path : path.split('/');
};

const computePathId = (
  route: RouteLocationNormalizedLoaded
): string | undefined => {
  const id = route.params.id;
  if (id == null || Array.isArray(id)) {
    return undefined;
  }
  return id;
};

export const computeViewKey = (
  route: RouteLocationNormalizedLoaded
): ViewKey | undefined => {
  const name = route.name;
  switch (name) {
    case DatasetPage.DETAIL:
      return 'detail';
    case DatasetPage.EDIT:
      return 'edit';
    case DatasetPage.NEW:
      return 'new';
    case DatasetPage.QUICK:
      return 'quick';
    case DatasetPage.RAW:
      return 'raw';
    case DatasetPage.TABLE:
      return 'table';
    default:
      return undefined;
  }
};

export const computeViewFlags = (
  route: RouteLocationNormalizedLoaded
): ViewFlags => {
  const name = route.name;

  const isTableView = name === DatasetPage.TABLE;
  const isDetailView = name === DatasetPage.DETAIL;
  const isEditView = name === DatasetPage.EDIT;
  const isQuickView = name === DatasetPage.QUICK;
  const isRawView = name === DatasetPage.RAW;
  const isNewView = name === DatasetPage.NEW;

  return {
    isTableView,
    isDetailView,
    isEditView,
    isQuickView,
    isRawView,
    isNewView,
  };
};
