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
          fields: { value: 'LocationInfo.RegionInfo.Id' },
          params: {
            url: withOdhBaseUrl(
              '/v1/Location?language=en&type=null&showall=true'
            ),
            labelSelector: 'name',
            keySelector: 'id',
          },
        },
        {
          title: 'Region ID',
          component: CellComponent.StringCell,
          fields: { text: 'LocationInfo.RegionInfo.Id' },
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
          fields: { value: 'LocationInfo.TvInfo.Id' },
          params: {
            url: withOdhBaseUrl(
              '/v1/Location?language=en&type=null&showall=true'
            ),
            labelSelector: 'name',
            keySelector: 'id',
          },
        },
        {
          title: 'Tourism Assocciation ID',
          component: CellComponent.StringCell,
          fields: { text: 'LocationInfo.TvInfo.Id' },
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
          fields: { value: 'LocationInfo.MunicipalityInfo.Id' },
          params: {
            url: withOdhBaseUrl('/v1/Municipality?removenullvalues=false'),
            labelSelector: 'Detail.en.Title',
            keySelector: 'Id',
          },
        },
        {
          title: 'Municipality ID',
          component: CellComponent.StringCell,
          fields: { text: 'LocationInfo.MunicipalityInfo.Id' },
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
          fields: { value: 'LocationInfo.DistrictInfo.Id' },
          params: {
            url: withOdhBaseUrl('/v1/District?removenullvalues=false'),
            labelSelector: 'Detail.en.Title',
            keySelector: 'Id',
          },
        },
        {
          title: 'District ID',
          component: CellComponent.StringCell,
          fields: { text: 'LocationInfo.DistrictInfo.Id' },
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
          fields: { value: 'Region.Id' },
          params: {
            url: withOdhBaseUrl(
              '/v1/Location?language=en&type=null&showall=true'
            ),
            labelSelector: 'name',
            keySelector: 'id',
          },
        },
        {
          title: ' Region ID',
          component: CellComponent.StringCell,
          fields: { text: 'Region.Id' },
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
          fields: { value: 'Tourismassociation.Id' },
          params: {
            url: withOdhBaseUrl(
              '/v1/Location?language=en&type=null&showall=true'
            ),
            labelSelector: 'name',
            keySelector: 'id',
          },
          required: true,
        },
        {
          title: 'Tourism Assocciation ID',
          component: CellComponent.StringCell,
          fields: { text: 'Tourismassociation.Id' },
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
          fields: { value: 'Municipality.Id' },
          params: {
            url: withOdhBaseUrl('/v1/Municipality?removenullvalues=false'),
            labelSelector: 'Detail.en.Title',
            keySelector: 'Id',
          },
        },
        {
          title: 'Municipality ID',
          component: CellComponent.StringCell,
          fields: { text: 'Municipality.Id' },
          params: { readonly: 'true' },
          class: 'break-all',
        },
      ],
    },
  ],
});

export const locationTableCell = (): PropertyConfig => ({
  title: 'Location',
  component: CellComponent.TextHighlightCell,
  class: 'w-52',
  fields: {
    title: 'LocationInfo.RegionInfo.Name.{language}',
    subtitle: 'LocationInfo.MunicipalityInfo.Name.{language}',
  },
});
