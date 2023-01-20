import { ListViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';
import { IMAGE_TABLE_CONFIG, SOURCE_TABLE_CONFIG } from '../configBuilder';

export const venueListView: ListViewConfig = {
  elements: [
    { ...IMAGE_TABLE_CONFIG },
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
    { ...SOURCE_TABLE_CONFIG },
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
