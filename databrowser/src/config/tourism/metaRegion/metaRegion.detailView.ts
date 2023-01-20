import { DetailViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';
import {
  ID_READONLY_CONFIG,
  IMAGE_GALLERY_CONFIG,
  LAST_CHANGES_CONFIG,
  ODH_TAG_SINGLE_VIEW_CONFIG,
} from '../configBuilder';

export const metaRegionDetailView: DetailViewConfig = {
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
              title: 'CustomId',
              component: CellComponent.StringCell,
              fields: { text: 'CustomId' },
              class: 'break-all',
            },
            {
              title: 'Tourismverein ID',
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
              title: 'Region Ids',
              component: CellComponent.ArrayCell,
              fields: {
                items: 'RegionIds',
              },
              params: {
                separator: ', ',
              },
            },
            {
              title: 'District Ids',
              component: CellComponent.ArrayCell,
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
              title: 'Active on Smg',
              component: CellComponent.StringCell,
              fields: { text: 'SmgActive' },
            },
            {
              title: 'Active',
              component: CellComponent.StringCell,
              fields: { text: 'Active' },
            },
            {
              title: 'Active on Open Data Hub',
              component: CellComponent.StringCell,
              fields: { text: 'OdhActive' },
            },
            {
              title: 'Published on',
              component: CellComponent.ArrayCell,
              fields: { items: 'PublishedOn' },
            },
            {
              title: 'visible in search',
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
              fields: {
                text: 'Detail.{language}.MetaTitle',
              },
            },
            {
              title: 'Meta Description',
              component: CellComponent.StringCell,
              fields: {
                text: 'Detail.{language}.MetaDesc',
              },
            },
            {
              title: 'Title',
              component: CellComponent.StringCell,
              fields: {
                text: 'Detail.{language}.Title',
              },
            },
            {
              title: 'Header',
              component: CellComponent.StringCell,
              fields: {
                text: 'Detail.{language}.Header',
              },
            },
            {
              title: 'SubHeader',
              component: CellComponent.StringCell,
              fields: {
                text: 'Detail.{language}.SubHeader',
              },
            },
            {
              title: 'Intro Text',
              component: CellComponent.HtmlCell,
              fields: {
                html: 'Detail.{language}.IntroText',
              },
            },
            {
              title: 'BaseText',
              component: CellComponent.StringCell,
              fields: {
                text: 'Detail.{language}.BaseText',
              },
            },
            {
              title: 'AdditionalText',
              component: CellComponent.StringCell,
              fields: {
                text: 'Detail.{language}.AdditionalText',
              },
            },
            {
              title: 'GetThereText',
              component: CellComponent.StringCell,
              fields: {
                text: 'Detail.{language}.GetThereText',
              },
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
      slug: 'Tags',
      subcategories: [
        {
          name: '',
          properties: [ODH_TAG_SINGLE_VIEW_CONFIG],
        },
      ],
    },
  ],
};
