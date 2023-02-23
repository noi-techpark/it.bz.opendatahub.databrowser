import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailViewConfig,
  EditViewConfig,
} from '../../../domain/datasetConfig/types';
import {
  dataStatesWithInsertsSubCategory,
  gpsDataCategory,
  idAndCustomIdCells,
  imageGalleryCategory,
  municipalityIdCell,
  odhTagCategory,
  regionIdCell,
  shortnameCell,
  sourceSubCategory,
  textInfoCategory,
  webcamTableCell,
} from '../../builder/tourism';
import { withOdhBaseUrl } from '../../utils';

export const districtSharedView = (): DetailViewConfig | EditViewConfig => ({
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
          properties: [
            ...idAndCustomIdCells(),
            {
              title: 'Siag ID',
              component: CellComponent.StringCell,
              fields: { text: 'SiagId' },
            },
            {
              title: 'Tourismverein ID',
              component: CellComponent.StringCell,
              fields: { text: 'TourismvereinId' },
            },
            regionIdCell('Region.Id'),
            municipalityIdCell('Municipality.Id'),
            {
              title: 'HGV ID',
              component: CellComponent.StringCell,
              fields: { text: 'hgv.id' },
            },
          ],
        },
        {
          ...dataStatesWithInsertsSubCategory([
            {
              position: 1,
              properties: [
                {
                  title: 'Is comune',
                  component: CellComponent.ToggleCell,
                  fields: { enabled: 'IsComune' },
                },
                {
                  title: 'Visible in Search',
                  component: CellComponent.ToggleCell,
                  fields: { enabled: 'VisibleInSearch' },
                },
              ],
            },
          ]),
        },
        sourceSubCategory(),
      ],
    },
    textInfoCategory(),
    imageGalleryCategory(),
    {
      name: 'Location',
      slug: 'location',
      subcategories: [
        {
          name: 'Location',
          properties: [
            {
              title: 'Tourism Assocciation',
              component: CellComponent.InputReferenceCell,
              fields: { value: 'Tourismassociation.Id' },
              params: {
                url: withOdhBaseUrl(
                  '/v1/Location?language=en&type=null&showall=true'
                ),
                labelSelector: 'name',
                keySelector: 'id',
              },
              required: true,
            },
            {
              title: 'Region / TVB',
              component: CellComponent.InputReferenceCell,
              fields: { value: 'Region.Id' },
              params: {
                url: withOdhBaseUrl(
                  '/v1/Location?language=en&type=null&showall=true'
                ),
                labelSelector: 'name',
                keySelector: 'id',
              },
              required: true,
            },
            {
              title: 'Municipality',
              component: CellComponent.InputReferenceCell,
              fields: { value: 'Municipality.Id' },
              params: {
                url: withOdhBaseUrl('/v1/Municipality?removenullvalues=false'),
                labelSelector: 'Detail.en.Title',
                keySelector: 'Id',
              },
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'Related content',
      slug: 'related-content',
      subcategories: [
        {
          name: 'Related data',
          properties: [
            {
              title: 'Activity',
              component: CellComponent.StringCell,
              fields: { text: 'RelatedContent' },
            },
            {
              title: 'Gastronomy',
              component: CellComponent.StringCell,
              fields: { text: 'RelatedContent' },
            },
            {
              title: 'Event',
              component: CellComponent.StringCell,
              fields: { text: 'RelatedContent' },
            },
          ],
        },
      ],
    },
    gpsDataCategory(),
    {
      name: 'Webcam Details',
      slug: 'webcam-details',
      subcategories: [
        {
          name: '',
          properties: [webcamTableCell()],
        },
      ],
    },
    odhTagCategory(),
  ],
});
