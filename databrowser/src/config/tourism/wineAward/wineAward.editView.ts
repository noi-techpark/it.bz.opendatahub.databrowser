import { EditViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';
import {
  ID_READONLY_CONFIG,
  IMAGE_GALLERY_CONFIG,
  LAST_CHANGES_CONFIG,
} from '../configBuilder';

export const wineAwardEditView: EditViewConfig = {
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
              title: 'Main Image',
              component: CellComponent.ImageCell,
              class: 'w-40',
              fields: {
                src: 'ImageGallery.0.ImageUrl',
              },
              params: {
                width: '15%',
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
              component: CellComponent.ToggleCell,
              fields: { enabled: 'Active' },
            },
            {
              title: 'Active on Open Data Hub',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'OdhActive' },
              params: { readonly: 'true' },
            },
            {
              title: 'Active on SMG',
              component: CellComponent.ToggleCell,
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
              title: 'Get There Text',
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
          properties: [IMAGE_GALLERY_CONFIG],
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
