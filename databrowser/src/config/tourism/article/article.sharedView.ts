import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailViewConfig,
  EditViewConfig,
} from '../../../domain/datasetConfig/types';
import {
  contactCategory,
  dataStatesSubCategory,
  idReadOnlyCell,
  imageGalleryCategory,
  odhTagCategory,
  shortnameCell,
  sourceSubCategory,
  textInfoCategory,
} from '../../builder/tourism';
import { withOdhBaseUrl } from '../../utils';

export const articleSharedView = (): DetailViewConfig | EditViewConfig => ({
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
        dataStatesSubCategory(),
        sourceSubCategory(),
      ],
    },
    textInfoCategory(),
    contactCategory(),
    imageGalleryCategory(),
    {
      name: 'Additional Information',
      slug: 'additional-information',
      subcategories: [
        {
          name: '',
          properties: [
            {
              title: '',
              component: CellComponent.ArticleAdditionalInfoCell,
              fields: {
                infos: 'AdditionalArticleInfos.{language}.Elements',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'Links',
      slug: 'links',
      subcategories: [
        {
          name: '',
          properties: [
            {
              title: '',
              component: CellComponent.ArticleLinkInfoCell,
              fields: {
                links: 'ArticleLinkInfo.{language}.Elements',
              },
            },
          ],
        },
      ],
    },
    odhTagCategory('article'),
    {
      name: 'Article Details',
      slug: 'article-details',
      subcategories: [
        {
          name: '',
          properties: [
            {
              title: 'Highlight',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'Highlight' },
            },
            {
              title: '',
              component: CellComponent.ArticleTypeCell,
              fields: {
                type: 'Type',
                subType: 'SubType',
              },
              params: { lookupUrl: withOdhBaseUrl('/v1/ArticleTypes') },
              required: true,
            },
            {
              title: 'Article Date',
              component: CellComponent.DateCell,
              fields: { date: 'ArticleDate' },
              params: { format: 'do MMMM yyyy' },
            },
            {
              title: 'Article Date To',
              component: CellComponent.DateCell,
              fields: { date: 'ArticleDateTo' },
              params: { format: 'do MMMM yyyy' },
            },
          ],
        },
      ],
    },
  ],
});
