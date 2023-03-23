import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailViewConfig,
  EditViewConfig,
} from '../../../domain/datasetConfig/types';
import {
  accoContactCategory,
  gpsDataCategory,
  idReadOnlyCell,
  imageGalleryCategory,
  lastChangesCell,
  locationCategory,
  odhTagCategory,
  shortnameCell,
  sourceSubCategory,
} from '../../builder/tourism';
import { publishedOnCell } from '../../builder/tourism/publishedOn';

export const venueSharedView = (): DetailViewConfig | EditViewConfig => ({
  elements: [
    {
      name: 'Main data',
      slug: 'main-data',
      subcategories: [
        {
          name: 'General data',
          properties: [shortnameCell()],
        },
        {
          name: 'IDs',
          properties: [idReadOnlyCell()],
        },
        {
          name: 'Data states',
          properties: [
            lastChangesCell(),
            {
              title: 'Active on Source',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'Active' },
            },
            {
              title: 'Active on Open Data Hub',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'OdhActive' },
              params: { readonly: 'true' },
            },
            publishedOnCell(),
          ],
        },
        sourceSubCategory(),
      ],
    },
    {
      name: 'Text information',
      slug: 'text-information',
      subcategories: [
        {
          name: 'General data',
          properties: [shortnameCell()],
        },
      ],
    },
    accoContactCategory(),
    imageGalleryCategory(),
    locationCategory(),
    gpsDataCategory(),
    odhTagCategory('venue'),
  ],
});
