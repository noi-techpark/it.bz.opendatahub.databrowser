import { CellComponent } from '../../domain/cellComponents/types';
import { ApiConfigEntry } from '../types';
import { tourismBaseUrl } from './urls';

export const odhAccommodationConfig: ApiConfigEntry = {
  description: {
    title: 'Accommodation',
    subtitle: 'This dataset contains tourism accommodations.',
    description:
      'This dataset contains various data about accommodations, mainly located in the South Tyrol region.',
  },
  listEndpoint: {
    url: `${tourismBaseUrl}/v1/Accommodation`,
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
