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
      name: 'Location',
      properties: [
        {
          title: 'Region / TVB',
          component: CellComponent.InputReferenceCell,
          fields: { value: 'LocationInfo.RegionInfo.Id' },
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
          title: 'Tourism Assocciation',
          component: CellComponent.InputReferenceCell,
          fields: { value: 'LocationInfo.TvInfo.Id' },
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
          title: 'Municipality',
          component: CellComponent.InputReferenceCell,
          fields: { value: 'LocationInfo.MunicipalityInfo.Id' },
          params: {
            url: withOdhBaseUrl('/v1/Municipality?removenullvalues=false'),
            labelSelector: 'Detail.en.Title',
            keySelector: 'Id',
          },
          required: true,
        },
        {
          title: 'District',
          component: CellComponent.InputReferenceCell,
          fields: { value: 'LocationInfo.DistrictInfo.Id' },
          params: {
            url: withOdhBaseUrl('/v1/District?removenullvalues=false'),
            labelSelector: 'Detail.en.Title',
            keySelector: 'Id',
          },
          required: true,
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
