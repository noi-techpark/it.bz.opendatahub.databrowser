import { CellComponent } from '../../../domain/cellComponents/types';
import { ListViewConfig } from '../../../domain/datasetConfig/types';
import { lastChangesTableCell, shortnameCell } from '../../builder/tourism';

export const publishedOnListView: ListViewConfig = {
  elements: [
    {
      title: 'Name',
      component: CellComponent.StringCell,
      class: 'w-60',
      fields: { text: 'Name.{language}' },
    },
    shortnameCell(),
    {
      title: 'Publisher URL',
      component: CellComponent.UrlCell,
      class: 'w-80',
      fields: { text: 'PublisherUrl' },
    },
    lastChangesTableCell(),
  ],
};
