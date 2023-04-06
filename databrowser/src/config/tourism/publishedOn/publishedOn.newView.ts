import { CellComponent } from '../../../domain/cellComponents/types';
import { EditViewConfig } from '../../../domain/datasetConfig/types';
import { shortnameCell, idCell } from '../../builder/tourism';

export const publishedOnNewView: EditViewConfig = {
  elements: [
    {
      name: 'Main data',
      slug: 'main-data',
      subcategories: [
        {
          name: 'General data',
          properties: [
            {
              title: 'Name',
              component: CellComponent.StringCell,
              fields: { text: 'Name.{language}' },
            },
            shortnameCell(),
            idCell(),
            {
              title: 'Publisher URL',
              component: CellComponent.UrlCell,
              fields: { text: 'PublisherUrl' },
            },
          ],
        },
      ],
    },
  ],
};
