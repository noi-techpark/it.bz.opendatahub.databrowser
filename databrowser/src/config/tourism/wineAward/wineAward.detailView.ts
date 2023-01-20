import { DetailViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';
import {
  ID_READONLY_CONFIG,
  IMAGE_GALLERY_CONFIG,
  LAST_CHANGES_CONFIG,
} from '../configBuilderListView';

export const wineAwardDetailView: DetailViewConfig = {
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
            },
            {
              title: 'Image',
              component: CellComponent.ImageCell,
              class: 'w-40',
              fields: {
                src: 'ImageGallery.0.ImageUrl',
              },
            },
          ],
        },
        {
          name: 'IDs',
          properties: [
            ID_READONLY_CONFIG,
            {
              title: 'Custom Id',
              component: CellComponent.StringCell,
              fields: { text: 'CustomId' },
              class: 'break-all',
            },
            {
              title: 'Company Id',
              component: CellComponent.StringCell,
              fields: { text: 'CompanyId' },
              class: 'break-all',
            },
          ],
        },
        {
          name: 'Data states',
          properties: [
            LAST_CHANGES_CONFIG,
            {
              title: 'Active on Source',
              component: CellComponent.StringCell,
              fields: { text: 'Active' },
            },
            {
              title: 'Active on Open Data Hub',
              component: CellComponent.StringCell,
              fields: { text: 'OdhActive' },
            },
            {
              title: 'Active on SMG',
              component: CellComponent.StringCell,
              fields: { text: 'SmgActive' },
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
              fields: { text: 'Detail.{language}.Subheader' },
            },
            {
              title: 'Intro Text',
              component: CellComponent.StringCell,
              fields: { text: 'Detail.{language}.IntroText' },
            },
            {
              title: 'There Text',
              component: CellComponent.StringCell,
              fields: { text: 'Detail.{language}.GetThereText' },
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
          properties: [
            IMAGE_GALLERY_CONFIG,
            {
              title: 'License',
              component: CellComponent.StringCell,
              fields: { text: 'LicenseInfo.License' },
            },
            {
              title: 'License Holder',
              component: CellComponent.StringCell,
              fields: { text: 'LicenseInfo.LicenseHolder' },
            },
          ],
        },
      ],
    },
    {
      name: 'Wine Award Details',
      slug: 'Wine Award Details',
      subcategories: [
        {
          name: 'Wine Award Details',
          properties: [
            {
              title: 'Vintage',
              component: CellComponent.StringCell,
              fields: { text: 'Vintage' },
            },
            {
              title: 'Awardyear',
              component: CellComponent.StringCell,
              fields: { text: 'Awardyear' },
            },
            {
              title: 'Awards',
              component: CellComponent.ArrayCell,
              class: 'w-40',
              fields: {
                items: 'Awards',
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
