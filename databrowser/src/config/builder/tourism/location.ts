import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailElements,
  PropertyConfig,
} from '../../../domain/datasetConfig/types';

export const locationCategory = (): DetailElements => ({
  name: 'Location',
  slug: 'location',
  subcategories: [
    {
      name: 'Location',
      properties: [
        {
          title: 'Region / TVB',
          component: CellComponent.StringCell,
          fields: { text: 'LocationInfo.RegionInfo.Name.{language}' },
        },
        {
          title: 'Tourismorganization',
          component: CellComponent.StringCell,
          fields: { text: 'TourismorganizationId' },
        },
        {
          title: 'Municipality',
          component: CellComponent.StringCell,
          fields: {
            text: 'LocationInfo.MunicipalityInfo.Name.{language}',
          },
        },
        {
          title: 'District',
          component: CellComponent.StringCell,
          fields: { text: 'LocationInfo.DistrictInfo.Name.{language}' },
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
