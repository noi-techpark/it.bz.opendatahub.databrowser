import { CellComponent } from '../../../domain/cellComponents/types';
import { domains } from '../../../domain/openApi';
import { ViewConfig } from '../../../domain/viewConfig/types';
import { odhAccommodationDescription } from './odhAccommodation.description';

export const odhAccommodationList: ViewConfig = {
  source: 'embedded',
  description: odhAccommodationDescription,
  baseUrl: domains.tourism.baseUrl,
  path: '/v1/Accommodation',
  renderConfig: {
    type: 'list',
    elements: [
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
          text: 'AccoDetail.{language}.Name',
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
};
