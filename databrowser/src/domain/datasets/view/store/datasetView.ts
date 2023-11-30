// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef } from 'vue';
import { ObjectValueReplacer, StringReplacer } from '../types';
import { ViewKey, ViewValue } from '../../config/types';
import { useDynamicParamsReplacement } from '../modifiers/dynamicParams/dynamicParamsReplacement';
import { useComputeViewPresence } from '../viewPresence';
import { useComputeViewType } from '../viewType';

export const useDatasetView = (
  views: MaybeRef<ViewValue | undefined>,
  viewKey: MaybeRef<ViewKey | undefined>,
  stringReplacer: MaybeRef<StringReplacer>,
  objectValueReplacer: MaybeRef<ObjectValueReplacer>
) => {
  const view = useDynamicParamsReplacement(
    views,
    viewKey,
    stringReplacer,
    objectValueReplacer
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
    view,
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
