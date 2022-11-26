import { ListViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';

export const venueListView: ListViewConfig = {
  elements: [
    {
      title: 'Image',
      component: CellComponent.ImageCell,
      class: 'w-36',
      fields: {
        src: 'ImageGallery.0.ImageUrl',
      },
    },
    {
      title: 'Name',
      component: CellComponent.StringCell,
      class: 'w-40',
      fields: {
        text: 'attributes.name.{language}',
      },
    },
    {
      title: 'Categories',
      component: CellComponent.ArrayCell,
      class: 'w-40',
      fields: {
        text: 'attributes.categories',
      },
    },
    {
      title: 'Location',
      component: CellComponent.StringCell,
      class: 'w-40',
      fields: {
        text: 'odhdata.LocationInfo.MunicipalityInfo.Name.{language}',
      },
    },
    {
      title: 'Available languages',
      component: CellComponent.ArrayCell,
      class: 'w-40',
      fields: {
        text: 'odhdata.HasLanguage',
      },
    },
    {
      title: 'Last update',
      component: CellComponent.StringCell,
      class: 'w-40',
      fields: {
        text: 'meta.lastUpdate',
      },
    },
    {
      title: 'Source',
      component: CellComponent.StringCell,
      class: 'w-40',
      fields: {
        text: '_Meta.Source',
      },
    },
    {
      title: 'Status',
      component: CellComponent.StringCell,
      class: 'w-40',
      fields: {
        text: 'odhdata.Active',
      },
    },
  ],
};
