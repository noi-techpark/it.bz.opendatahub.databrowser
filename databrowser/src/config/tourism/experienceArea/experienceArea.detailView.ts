import { DetailViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';
import { LAST_CHANGES_CONFIG } from '../configBuilderCommonView';
import { ODH_TAG_SINGLE_VIEW_CONFIG } from '../configBuilderSingleView';
import {
  IMAGE_GALLERY_CONFIG,
  ID_READONLY_CONFIG,
} from '../configBuilderCommonView';

export const experienceAreaDetailView: DetailViewConfig = {
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
            {
              title: 'Tourismverein IDs',
              component: CellComponent.ArrayCell,
              class: 'w-40',
              fields: {
                items: 'TourismvereinIds',
              },
              params: {
                separator: ', ',
              },
            },
            {
              title: 'District IDs',
              component: CellComponent.ArrayCell,
              class: 'w-40',
              fields: {
                items: 'DistrictIds',
              },
              params: {
                separator: ', ',
              },
            },
          ],
        },
        {
          name: 'Data states',
          properties: [
            LAST_CHANGES_CONFIG,
            {
              title: 'Active',
              component: CellComponent.StringCell,
              fields: { text: 'Active' },
            },
            {
              title: 'Active on SMG',
              component: CellComponent.StringCell,
              fields: { text: 'SmgActive' },
            },
            {
              title: 'Active on Open Data Hub',
              component: CellComponent.StringCell,
              fields: { text: 'OdhActive' },
            },
            {
              title: 'Visible in Search',
              component: CellComponent.StringCell,
              fields: { text: 'VisibleInSearch' },
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
              title: 'Meta Title',
              component: CellComponent.StringCell,
              fields: { text: 'Detail.{language}.MetaTitle' },
            },
            {
              title: 'Description',
              component: CellComponent.StringCell,
              fields: { text: 'Detail.{language}.MetaDesc' },
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
              component: CellComponent.StringCell,
              fields: { text: 'Detail.{language}.Subheader' },
            },
            {
              title: 'Intro Text',
              component: CellComponent.StringCell,
              fields: { text: 'Detail.{language}.IntroText' },
            },
            {
              title: 'Base Text',
              component: CellComponent.StringCell,
              fields: { text: 'Detail.{language}.BaseText' },
            },
            {
              title: 'Additional Text',
              component: CellComponent.StringCell,
              fields: { text: 'Detail.{language}.AdditionalText' },
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
      name: 'Location',
      slug: 'location',
      subcategories: [
        {
          name: 'Locations',
          properties: [
            {
              title: 'Districts',
              component: CellComponent.ArrayCell,
              class: 'w-40',
              fields: {
                items: 'Districts',
              },
              params: {
                separator: ', ',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'GPS Data',
      slug: 'gps-data',
      subcategories: [
        {
          name: 'GPS Data',
          properties: [
            {
              title: '',
              component: CellComponent.GpsPointsCell,
              class: 'w-48',
              fields: {
                type: 'GpsPoints.position.Gpstype',
                latitude: 'GpsPoints.position.Latitude',
                longitude: 'GpsPoints.position.Longitude',
                altitude: 'GpsPoints.position.Altitude',
                altitudeUnit: 'GpsPoints.position.AltitudeUnitofMeasure',
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
          properties: [ODH_TAG_SINGLE_VIEW_CONFIG],
        },
      ],
    },
  ],
};
