import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailViewConfig,
  EditViewConfig,
} from '../../../domain/datasetConfig/types';
import {
  idReadOnlyCell,
  lastChangesCell,
  shortnameCell,
} from '../../builder/tourism';

export const publishedOnSharedView = (): DetailViewConfig | EditViewConfig => ({
  elements: [
    {
      name: 'Main data',
      slug: 'main-data',
      subcategories: [
        {
          name: 'General data',
          properties: [
            shortnameCell(),
            idReadOnlyCell(),
            {
              title: 'Publisher URL',
              component: CellComponent.UrlCell,
              fields: { text: 'PublisherUrl' },
            },
            lastChangesCell(),
          ],
        },
      ],
    },
  ],
});
