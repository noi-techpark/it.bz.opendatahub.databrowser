import { ListViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';

export const gastronomyListView: ListViewConfig = {
  elements: [
    {
      title: 'Image',
      component: CellComponent.ImageCell,
      class: 'w-40',
      fields: {
        src: 'ImageGallery.0.ImageUrl',
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
      title: 'Tags',
      component: CellComponent.ArrayCellTags,
      class: 'w-40',
      fields: {
        items: 'CategoryCodes',
      },
      params: {
        fieldName: 'Shortname',
        separator: ', ',
        max: '3',
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
        format: 'do MMMM yyyy',
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
      title: 'Open Data Hub state',
      component: CellComponent.StateCell,
      class: 'w-36',
      fields: {
        state: 'OdhActive',
      },
    },
  ],
};
