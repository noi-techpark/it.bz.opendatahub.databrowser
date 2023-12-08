// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef } from 'vue';
import { ObjectValueReplacer, StringReplacer } from '../types';
import {
  DatasetDomain,
  DatasetPath,
  ViewKey,
  ViewValue,
} from '../../config/types';
import { useDynamicParamsReplacement } from '../modifiers/dynamicParams/dynamicParamsReplacement';
import { useComputeViewPresence } from '../viewPresence';
import { useComputeViewType } from '../viewType';
import { useOpenApiEnhancements } from '../modifiers/openApiEnhancements/openApiEnhancements';

export const useDatasetView = (
  datasetDomain: MaybeRef<DatasetDomain | undefined>,
  datasetPath: MaybeRef<DatasetPath | undefined>,
  views: MaybeRef<ViewValue | undefined>,
  viewKey: MaybeRef<ViewKey | undefined>,
  stringReplacer: MaybeRef<StringReplacer>,
  objectValueReplacer: MaybeRef<ObjectValueReplacer>
) => {
  // Compute view with dynamic params replacement, e.g. replace Details.{language}.title
  // with Details.it.title if the current language is "it".
  const viewWithReplacements = useDynamicParamsReplacement(
    datasetDomain,
    views,
    viewKey,
    stringReplacer,
    objectValueReplacer
  );

  // Enhance view with OpenAPI information
  const viewWithOpenApiEnhancements = useOpenApiEnhancements(
    datasetDomain,
    datasetPath,
    viewKey,
    viewWithReplacements
  );

  // Compute view type
  const {
    isTableView,
    isDetailView,
    isEditView,
    isNewView,
    isQuickView,
    isRawView,
  } = useComputeViewType(viewKey);

  // Compute which views are present in the dataset config
  const {
    hasTableView,
    hasDetailView,
    hasEditView,
    hasNewView,
    hasQuickView,
    hasRawView,
  } = useComputeViewPresence(views);

  return {
    view: viewWithOpenApiEnhancements,
    isTableView,
    isDetailView,
    isEditView,
    isNewView,
    isQuickView,
    isRawView,
    hasTableView,
    hasDetailView,
    hasEditView,
    hasNewView,
    hasQuickView,
    hasRawView,
  };
};
