import { DetailViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';

export const municipalityDetailView: DetailViewConfig = {
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
              title: 'CAP',
              component: CellComponent.StringCell,
              fields: {
                text: 'Plz',
              },
            },
            {
              title: 'Inhabitants',
              component: CellComponent.StringCell,
              fields: {
                text: 'Inhabitants',
              },
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
            {
              title: 'ID',
              component: CellComponent.StringCell,
              fields: { text: 'Id' },
              class: 'break-all',
            },
            {
              title: 'Custom Id',
              component: CellComponent.StringCell,
              fields: { text: 'CustomId' },
              class: 'break-all',
            },
            {
              title: 'Siag Id',
              component: CellComponent.StringCell,
              fields: { text: 'SiagId' },
              class: 'break-all',
            },
            {
              title: 'Tourismverein Id',
              component: CellComponent.StringCell,
              fields: { text: 'TourismvereinId' },
              class: 'break-all',
            },
            {
              title: 'Istat Number',
              component: CellComponent.StringCell,
              fields: { text: 'IstatNumber' },
              class: 'break-all',
            },
            {
              title: 'Region Id',
              component: CellComponent.StringCell,
              fields: { text: 'RegionId' },
              class: 'break-all',
            },
            {
              title: 'HGV id',
              component: CellComponent.StringCell,
              fields: { text: 'Mapping.hgv.id' },
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
              fields: { text: 'SmgActive' },
            },
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
      name: 'GPS Data',
      slug: 'Gps',
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
          name: 'Tags',
          properties: [
            {
              title: 'Open Data Hub Tags',
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
