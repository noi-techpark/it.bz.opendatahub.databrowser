import { CellComponent } from '../../../domain/cellComponents/types';
import { EditViewConfig } from '../../../domain/datasetConfig/types';
import { withOdhBaseUrl } from '../../utils';
import {
  IMAGE_GALLERY_CONFIG,
  odhTagConfigWithMainEntity,
} from '../configBuilderListView';

export const articleNewView: EditViewConfig = {
  elements: [
    {
      name: 'Main data',
      slug: 'main-data',
      subcategories: [
        {
          name: 'General data',
          properties: [
            {
              title: 'Shortname',
              component: CellComponent.StringCell,
              fields: { text: 'Shortname' },
              required: true,
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
    {
      name: 'Text information',
      slug: 'text-information',
      subcategories: [
        {
          name: '',
          properties: [
            {
              title: 'Meta Title',
              component: CellComponent.StringCell,
              fields: { text: 'MetaTitle' },
            },
            {
              title: 'Meta Description',
              component: CellComponent.StringCell,
              fields: { text: 'MetaDesc' },
            },
            {
              title: 'Title',
              component: CellComponent.StringCell,
              fields: { text: 'Detail.{language}.Title' },
            },
            {
              title: 'Header',
              component: CellComponent.StringCell,
              fields: { text: 'Detail.{language}.Header' },
            },
            {
              title: 'Subheader',
              component: CellComponent.TextAreaCell,
              fields: { text: 'Detail.{language}.SubHeader' },
            },
            {
              title: 'Intro text',
              component: CellComponent.TextAreaCell,
              fields: { text: 'Detail.{language}.IntroText' },
              params: { rows: '4' },
            },
            {
              title: 'Base text',
              component: CellComponent.HtmlCell,
              fields: { html: 'Detail.{language}.BaseText' },
            },
            {
              title: 'Additional text',
              component: CellComponent.TextAreaCell,
              fields: { text: 'Detail.{language}.AdditionalText' },
              params: { rows: '4' },
            },
            {
              title: 'Get there text',
              component: CellComponent.TextAreaCell,
              fields: { text: 'Detail.{language}.GetThereText' },
              params: { rows: '4' },
            },
          ],
        },
      ],
    },
    {
      name: 'Contact',
      slug: 'contact',
      subcategories: [
        {
          name: 'Name and Company Data',
          properties: [
            {
              title: 'Name',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.CompanyName' },
            },
            {
              title: 'First Name',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.Givenname' },
            },
            {
              title: 'Surname',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.Surname' },
            },
            {
              title: 'Name prefix',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.NamePrefix' },
            },
            {
              title: 'Tax Number',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.Tax' },
            },
            {
              title: 'Vat-ID',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.Vat' },
            },
          ],
        },
        {
          name: 'Address',
          properties: [
            {
              title: 'Street and House No',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.Address' },
            },
            // TODO: check which field to use
            {
              title: 'Complement',
              component: CellComponent.StringCell,
              fields: { text: 'Complement' },
            },
            {
              title: 'ZIP-Code',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.ZipCode' },
            },
            {
              title: 'City',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.City' },
            },
            {
              title: 'Country',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.CountryName' },
            },
            {
              title: 'Country Abbrevation',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.CountryCode' },
            },
          ],
        },
        {
          name: 'Contact Details',
          properties: [
            {
              title: 'E-Mail',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.Email' },
            },
            {
              title: 'Phone Number',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.Phonenumber' },
            },
            {
              title: 'Mobile Phone',
              component: CellComponent.StringCell,
              fields: { text: '' },
            },
            {
              title: 'Web-URL',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.Url' },
            },
            // TODO: check which field to use
            {
              title: 'Additional URL (Independent URL)',
              component: CellComponent.StringCell,
              fields: { text: 'AdditionalUrl' },
            },
          ],
        },
      ],
    },
    {
      name: 'Images',
      slug: 'images',
      subcategories: [
        {
          name: '',
          properties: [IMAGE_GALLERY_CONFIG],
        },
      ],
    },
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
    {
      name: 'Tags',
      slug: 'tags',
      subcategories: [
        {
          name: '',
          properties: [odhTagConfigWithMainEntity('article')],
        },
      ],
    },
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
