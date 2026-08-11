<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <ArrayLookupCell
    :lookup-url="lookupUrlWithSource"
    :key-selector="keySelector"
    :label-selector="labelSelector"
    :items="items"
    :unique="unique"
    :add-label="addLabel"
    :show-url="showUrl"
    :no-options-available-label="noOptionsAvailableLabel"
    :enabled="source != null"
    :disabled-label="disabledLabel"
  />
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { useEditStore } from '../../../../datasets/ui/editView/store/editStore';
import ArrayLookupCell from './ArrayLookupCell.vue';

const props = defineProps<{
  lookupUrl?: string;
  keySelector?: string;
  labelSelector?: string;
  items?: string[] | null;
  unique?: boolean | string;
  addLabel?: string;
  showUrl?: boolean | string;
  noOptionsAvailableLabel?: string;
  disabledLabel?: string;
}>();

const editStore = useEditStore();
const attrs = useAttrs();

// Allows configuring exceptions where a source value should be expanded
// to a broader list of sources when filtering the lookup, e.g. params:
// { sourceOverrideFrom_001: 'noi', sourceOverrideTo_001: 'noi,nobis,eurac' }
const sourceOverrides = computed(() =>
  Object.entries(attrs)
    .filter(([key]) => key.startsWith('sourceOverrideFrom_'))
    .reduce<Record<string, string>>((previous, [key, from]) => {
      const suffix = key.substring('sourceOverrideFrom_'.length);
      const to = attrs[`sourceOverrideTo_${suffix}`];

      if (typeof from !== 'string' || typeof to !== 'string') {
        return previous;
      }

      return { ...previous, [from]: to };
    }, {})
);

const source = computed(() => {
  const current = editStore.current as Record<string, unknown>;
  return typeof current?.Source === 'string' && current.Source.length > 0
    ? current.Source
    : null;
});

const lookupUrlWithSource = computed(() => {
  if (props.lookupUrl == null || source.value == null) return props.lookupUrl;
  const resolvedSource =
    sourceOverrides.value[source.value] ?? source.value;
  const separator = props.lookupUrl.includes('?') ? '&' : '?';
  return `${props.lookupUrl}${separator}source=${encodeURIComponent(
    resolvedSource
  )}`;
});
</script>
