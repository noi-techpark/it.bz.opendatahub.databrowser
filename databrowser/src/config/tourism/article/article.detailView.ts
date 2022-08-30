import { CellComponent } from '../../../domain/cellComponents/types';
import { DetailViewConfig } from '../../../domain/datasetConfig/types';

export const articleDetailView: DetailViewConfig = {
  elements: [
    {
      name: 'Main data',
      slug: 'main-data',
      subcategories: [
        {
          name: 'General data',
          properties: [
            {
              title: 'Title',
              component: CellComponent.StringCell,
              fields: { text: 'Detail.{language}.Title' },
            },
            {
              title: 'Shortname',
              component: CellComponent.StringCell,
              fields: { text: 'Shortname' },
            },
            {
              title: 'Logo',
              component: CellComponent.StringCell,
              fields: { text: 'LogoUrl' },
            },

            {
              title: 'Highlight',
              component: CellComponent.StringCell,
              fields: { text: 'Highlight' },
            },
            {
              title: 'Type',
              component: CellComponent.StringCell,
              fields: { text: 'Type' },
            },
            {
              title: 'Sub Type',
              component: CellComponent.StringCell,
              fields: { text: 'SubType' },
            },
            {
              title: 'Article Date',
              component: CellComponent.StringCell,
              fields: { text: 'ArticleDate' },
            },
            {
              title: 'Article Date To',
              component: CellComponent.StringCell,
              fields: { text: 'ArticleDateTo' },
            },
          ],
        },
        {
          name: 'IDs',
          properties: [
            {
              title: 'ID',
              component: CellComponent.StringCell,
              fields: { text: 'Id' },
              class: 'break-all',
            },
          ],
        },
        {
          name: 'Data states',
          properties: [
            {
              title: 'Last Changes',
              component: CellComponent.DateCell,
              fields: { date: 'LastChange' },
              params: {
                format: 'd/M/yyyy HH:mm',
              },
            },
            {
              title: 'Active on Source',
              component: CellComponent.StringCell,
              fields: { text: 'Active' },
            },
            {
              title: 'Active on SMG',
              component: CellComponent.StringCell,
              fields: { text: 'SmgActive' },
            },
            {
              title: 'Active on ODH',
              component: CellComponent.StringCell,
              fields: { text: 'OdhActive' },
            },
            {
              title: 'Active on',
              component: CellComponent.ArrayCell,
              class: 'w-40',
              fields: {
                items: 'PublishedOn',
              },
              params: {
                separator: ', ',
              },
            },
          ],
        },
        {
          name: 'Source',
          properties: [
            {
              title: 'Source',
              component: CellComponent.StringCell,
              fields: { text: 'Source' },
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
          name: 'General data',
          properties: [
            {
              title: 'Shortname',
              component: CellComponent.StringCell,
              fields: { text: 'Shortname' },
            },
          ],
        },
        {
          name: 'Detail',
          properties: [
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
              component: CellComponent.StringCell,
              fields: { text: 'Detail.{language}.SubHeader' },
            },
            {
              title: 'Intro text',
              component: CellComponent.StringCell,
              fields: { text: 'Detail.{language}.IntroText' },
            },
            {
              title: 'Base text',
              component: CellComponent.HtmlCell,
              fields: { html: 'Detail.{language}.BaseText' },
            },
            {
              title: 'Additional text',
              component: CellComponent.StringCell,
              fields: { html: 'Detail.{language}.AdditionalText' },
            },
            {
              title: 'Get there text',
              component: CellComponent.StringCell,
              fields: { html: 'Detail.{language}.GetThereText' },
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
          name: 'Images',
          properties: [
            {
              title: '',
              component: CellComponent.ImageGalleryCell,
              fields: {
                images: 'ImageGallery',
              },
              params: {
                alt: 'ImageAltText.{language}',
                src: 'ImageUrl',
                name: 'ImageName',
                width: 'Width',
                height: 'Height',
                title: 'ImageTitle.{language}',
                description: 'ImageDesc.{language}',
                license: 'License',
                listPosition: 'ListPosition',
                active: '',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'Location',
      slug: 'location',
      subcategories: [
        {
          name: 'Location',
          properties: [
            {
              title: 'Region / TVB',
              component: CellComponent.StringCell,
              fields: { text: 'LocationInfo.RegionInfo.Name.{language}' },
            },
            {
              title: 'Tourismorganization',
              component: CellComponent.StringCell,
              fields: { text: 'TourismorganizationId' },
            },
            {
              title: 'Municipality',
              component: CellComponent.StringCell,
              fields: {
                text: 'LocationInfo.MunicipalityInfo.Name.{language}',
              },
            },
            {
              title: 'District',
              component: CellComponent.StringCell,
              fields: { text: 'LocationInfo.DistrictInfo.Name.{language}' },
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
          name: 'ODH Tags',
          properties: [
            {
              title: 'ODH Tags',
              component: CellComponent.ArrayCellTags,
              class: 'w-40',
              fields: {
                items: 'ODHTags',
              },
              params: {
                fieldName: 'Id',
                separator: ', ',
                max: '3',
              },
            },
            {
              title: 'SMG Tags',
              component: CellComponent.ArrayCell,
              class: 'w-40',
              fields: {
                items: 'SmgTags',
              },
              params: {
                separator: ', ',
              },
            },
          ],
        },
      ],
    },
  ],
};
