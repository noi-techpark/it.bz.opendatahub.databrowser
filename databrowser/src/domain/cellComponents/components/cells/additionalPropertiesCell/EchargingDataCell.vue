<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <AdditionalPropertySection label="Primary Data (synced from mobility api)">
      <SubCategoryItem title="State">
        <SelectWithOptionsCell
          :value="propertyValue.State"
          :options="[
            { label: 'unavailable', value: 'UNAVAILABLE' },
            { label: 'active', value: 'ACTIVE' },
            {
              label: 'temporary unavailable',
              value: 'TEMPORARYUNAVAILABLE',
            },
            { label: 'available', value: 'AVAILABLE' },
            { label: 'unknown', value: 'UNKNOWN' },
            { label: 'fault', value: 'FAULT' },
            { label: 'planned', value: 'PLANNED' },
          ]"
          :editable="editable"
          @update="emitUpdate('State', $event.value)"
        />
      </SubCategoryItem>
      <SubCategoryItem title="Access type">
        <SelectWithOptionsCell
          :value="propertyValue.AccessType"
          :options="[
            { label: 'public', value: 'PUBLIC' },
            { label: 'private', value: 'PRIVATE' },
            {
              label: 'private with public access',
              value: 'PRIVATE_WITHPUBLICACCESS',
            },
          ]"
          :editable="editable"
          @update="emitUpdate('AccessType', $event.value)"
        />
      </SubCategoryItem>
      <SubCategoryItem title="Public accessible">
        <ToggleCell
          :enabled="propertyValue.ChargingStationAccessible"
          :editable="editable"
          @update="emitUpdate('ChargingStationAccessible', $event.value)"
        />
      </SubCategoryItem>
      <SubCategoryItem title="Access type info">
        <DictionaryCell
          :dictitems="propertyValue.AccessTypeInfo"
          :editable="editable"
          @update="emitUpdate('AccessTypeInfo', $event.value)"
        />
      </SubCategoryItem>
      <SubCategoryItem title="Payment info">
        <StringCell
          :text="propertyValue.PaymentInfo"
          :editable="editable"
          @update="emitUpdate('PaymentInfo', $event.value)"
        />
      </SubCategoryItem>
      <SubCategoryItem title="Charging plugs count">
        <StringCell
          :text="propertyValue.ChargingPlugCount"
          :editable="editable"
          @update="emitUpdate('ChargingPlugCount', $event.value)"
        />
      </SubCategoryItem>
      <SubCategoryItem title="Charging plugs types">
        <ArrayEditableCell
          :items="propertyValue.ChargingCableType"
          :editable="editable"
          @update="emitUpdate('ChargingCableType', $event.value)"
        />
      </SubCategoryItem>
    </AdditionalPropertySection>

    <AdditionalPropertySection label="Survey Data">
      <SubCategoryItem title="Survey Date">
        <DateCell
          :date="propertyValue.SurveyDate"
          :editable="editable"
          @update="emitUpdate('SurveyDate', $event.value)"
        />
      </SubCategoryItem>
    </AdditionalPropertySection>

    <AdditionalPropertySection label="Horizontal Carparking">
      <SubCategoryItem title="Flat">
        <ToggleCell
          :enabled="propertyValue.CarparkingAreaInColumns"
          :editable="editable"
          @update="emitUpdate('CarparkingAreaInColumns', $event.value)"
        />
      </SubCategoryItem>
    </AdditionalPropertySection>
  </div>
</template>

<script setup lang="ts">
import SubCategoryItem from '../../../../datasets/ui/category/SubCategoryItem.vue';
import ArrayEditableCell from '../arrayCell/ArrayEditableCell.vue';
import DictionaryCell from '../dictionaryCell/DictionaryCell.vue';
import SelectWithOptionsCell from '../selectWithOptionsCell/SelectWithOptionsCell.vue';
import StringCell from '../stringCell/StringCell.vue';
import ToggleCell from '../toggleCell/ToggleCell.vue';
import { EchargingDataProperties } from './types';
import AdditionalPropertySection from './AdditionalPropertySection.vue';
import DateCell from '../dateCell/DateCell.vue';

const props = withDefaults(
  defineProps<{
    propertyValue?: Partial<EchargingDataProperties>;
    editable?: boolean;
  }>(),
  {
    propertyValue: () => ({}),
    editable: false,
  }
);

const emit = defineEmits(['update']);

const emitUpdate = (prop: keyof EchargingDataProperties, value: any) => {
  const newValue = { ...props.propertyValue, [prop]: value };
  emit('update', newValue);
};
</script>
