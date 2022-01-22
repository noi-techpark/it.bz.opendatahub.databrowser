import { CellComponent } from '../../domain/cellComponents/types';
import { ApiConfigEntry } from '../types';
import { tourismBaseUrl } from './urls';

export const odhActivityPoiTypesConfig: ApiConfigEntry = {
  listEndpoint: {
    url: `${tourismBaseUrl}/v1/ODHActivityPoiTypes`,
    tableConfig: [
      {
        title: 'Image',
        component: CellComponent.ImageCell,
        class: 'w-40',
        fields: {
          src: 'ImageGallery.[0].ImageUrl',
        },
      },
      {
        title: 'Title',
        component: CellComponent.StringCell,
        class: 'w-48',
        fields: {
          text: 'Detail.{language}.Title',
        },
      },
      {
        title: 'Location',
        component: CellComponent.TextHighlightCell,
        class: 'w-40',
        fields: {
          title: 'LocationInfo.RegionInfo.Name.{language}',
          subtitle: 'LocationInfo.MunicipalityInfo.Name.{language}',
        },
      },
      {
        title: 'Languages',
        component: CellComponent.ArrayCell,
        class: 'w-40',
        fields: {
          items: 'HasLanguage',
        },
        params: {
          separator: ', ',
        },
      },
      {
        title: 'Edited',
        component: CellComponent.EditedDateCell,
        class: 'w-40',
        fields: {
          date: 'LastChange',
        },
        params: {
          format: 'dd. MMMM yyyy',
        },
      },
      {
        title: 'Source',
        component: CellComponent.StringCell,
        class: 'w-36',
        fields: {
          text: 'Source',
        },
      },
      {
        title: 'ODH state',
        component: CellComponent.StateCell,
        class: 'w-36',
        fields: {
          state: 'OdhActive',
        },
      },
    ],
  },
  detailEndpoint: {
    url: `${tourismBaseUrl}/v1/ODHActivityPoiTypes/{id}`,
    viewConfig: [
      { name: 'Main data', slug: 'main-data', subcategories: [] },
      {
        name: 'Text information',
        slug: 'text-information',
        subcategories: [],
      },
    ],
  },
};
