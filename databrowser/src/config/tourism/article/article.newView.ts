import { CellComponent } from '../../../domain/cellComponents/types';
import { EditViewConfig } from '../../../domain/datasetConfig/types';
import {
  imageGalleryCategory,
  odhTagCategory,
  shortnameCell,
  textInfoCategory,
  contactCategory,
} from '../../builder/tourism';
import { withOdhBaseUrl } from '../../utils';

export const articleNewView: EditViewConfig = {
  elements: [
    {
      name: 'Main data',
      slug: 'main-data',
      subcategories: [
        {
          name: 'General data',
          properties: [
            shortnameCell({ required: true }),
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
          ],
        },
        {
          name: 'States',
          properties: [
            {
              title: 'Highlight',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'Highlight' },
            },
            {
              title: 'Active on Source',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'Active' },
            },
            {
              title: 'Active on Open Data Hub',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'OdhActive' },
            },
          ],
        },
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
            },
            {
              title: 'Article Date',
              component: CellComponent.DateCell,
              fields: { date: 'ArticleDate' },
            },
            {
              title: 'Article Date To',
              component: CellComponent.DateCell,
              fields: { date: 'ArticleDateTo' },
            },
          ],
        },
      ],
    },
  ],
};
