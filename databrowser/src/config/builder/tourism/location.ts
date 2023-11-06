// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailElements,
  PropertyConfig,
} from '../../../domain/datasetConfig/types';
import { withOdhBaseUrl } from '../../utils';

export const locationCategory = (): DetailElements => ({
  name: 'Location',
  slug: 'location',
  subcategories: [
    {
      name: 'Region',
      properties: [
        {
          title: '',
          component: CellComponent.InputReferenceCell,
          propertyMappings: { value: 'LocationInfo.RegionInfo.Id' },
          params: {
            url: withOdhBaseUrl('/v1/Location?type=reg&showall=true'),
            labelSelector: 'name.{language}',
            keySelector: 'id',
          },
        },
        {
          title: 'Region ID',
          component: CellComponent.StringCell,
          propertyMappings: { text: 'LocationInfo.RegionInfo.Id' },
          params: { readonly: 'true' },
          class: 'break-all',
        },
      ],
    },
    {
      name: 'Tourism Assocciation',
      properties: [
        {
          title: '',
          component: CellComponent.InputReferenceCell,
          propertyMappings: { value: 'LocationInfo.TvInfo.Id' },
          params: {
            url: withOdhBaseUrl('/v1/Location?type=tvs&showall=true'),
            labelSelector: 'name.{language}',
            keySelector: 'id',
          },
        },
        {
          title: 'Tourism Assocciation ID',
          component: CellComponent.StringCell,
          propertyMappings: { text: 'LocationInfo.TvInfo.Id' },
          params: { readonly: 'true' },
          class: 'break-all',
        },
      ],
    },
    {
      name: 'Municipality',
      properties: [
        {
          title: '',
          component: CellComponent.InputReferenceCell,
          propertyMappings: { value: 'LocationInfo.MunicipalityInfo.Id' },
          params: {
            url: withOdhBaseUrl('/v1/Location?type=mun&showall=true'),
            labelSelector: 'name.{language}',
            keySelector: 'id',
          },
        },
        {
          title: 'Municipality ID',
          component: CellComponent.StringCell,
          propertyMappings: { text: 'LocationInfo.MunicipalityInfo.Id' },
          params: { readonly: 'true' },
          class: 'break-all',
        },
      ],
    },
    {
      name: 'District',
      properties: [
        {
          title: '',
          component: CellComponent.InputReferenceCell,
          propertyMappings: { value: 'LocationInfo.DistrictInfo.Id' },
          params: {
            url: withOdhBaseUrl('/v1/Location?type=fra&showall=true'),
            labelSelector: 'name.{language}',
            keySelector: 'id',
          },
        },
        {
          title: 'District ID',
          component: CellComponent.StringCell,
          propertyMappings: { text: 'LocationInfo.DistrictInfo.Id' },
          params: { readonly: 'true' },
          class: 'break-all',
        },
      ],
    },
  ],
});

export const locationCategoryDistrict = (): DetailElements => ({
  name: 'Location',
  slug: 'location',
  subcategories: [
    {
      name: 'Region',
      properties: [
        {
          title: '',
          component: CellComponent.InputReferenceCell,
          propertyMappings: { value: 'Region.Id' },
          params: {
            url: withOdhBaseUrl('/v1/Location?type=reg&showall=true'),
            labelSelector: 'name.{language}.',
            keySelector: 'id',
          },
        },
        {
          title: ' Region ID',
          component: CellComponent.StringCell,
          propertyMappings: { text: 'Region.Id' },
          params: { readonly: 'true' },
          class: 'break-all',
        },
      ],
    },
    {
      name: 'Tourism Assocciation',
      properties: [
        {
          title: '',
          component: CellComponent.InputReferenceCell,
          propertyMappings: { value: 'Tourismassociation.Id' },
          params: {
            url: withOdhBaseUrl('/v1/Location?type=tvs&showall=true'),
            labelSelector: 'name.{language}',
            keySelector: 'id',
          },
          required: true,
        },
        {
          title: 'Tourism Assocciation ID',
          component: CellComponent.StringCell,
          propertyMappings: { text: 'Tourismassociation.Id' },
          params: { readonly: 'true' },
          class: 'break-all',
        },
      ],
    },
    {
      name: 'Municipality',
      properties: [
        {
          title: '',
          component: CellComponent.InputReferenceCell,
          propertyMappings: { value: 'Municipality.Id' },
          params: {
            url: withOdhBaseUrl('/v1/Location?type=mun&showall=true'),
            labelSelector: 'name.{language}',
            keySelector: 'id',
          },
        },
        {
          title: 'Municipality ID',
          component: CellComponent.StringCell,
          propertyMappings: { text: 'Municipality.Id' },
          params: { readonly: 'true' },
          class: 'break-all',
        },
      ],
    },
  ],
});

export const locationTableCells = (): PropertyConfig[] => [
  {
    title: 'Region',
    component: CellComponent.StringCell,
    class: 'w-52',
    propertyMappings: { text: 'LocationInfo.RegionInfo.Name.{language}' },
  },
  {
    title: 'Municipality',
    component: CellComponent.StringCell,
    class: 'w-52',
    propertyMappings: { text: 'LocationInfo.MunicipalityInfo.Name.{language}' },
  },
];
