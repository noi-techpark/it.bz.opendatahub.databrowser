import {
  CellComponent,
  FilterComponent,
} from '../../domain/cellComponents/types';
import { ApiConfigEntry } from '../types';
import { tourismBaseUrl } from './urls';

export const odhActivityPoiConfig: ApiConfigEntry = {
  description: {
    title: 'Activities and Points of Interest (POIs)',
    subtitle:
      'This dataset contains a collection of activities and points of interest (POIs).',
    description:
      'This dataset contains a collection of activities and points of interest (POIs) mainly in the South Tyrol region. The available data is provided by several sources structured according to IDM categorisation.',
  },
  listEndpoint: {
    url: `${tourismBaseUrl}/v1/ODHActivityPoi`,
    tableConfig: [
      {
        title: 'Image',
        component: CellComponent.ImageCell,
        class: 'w-40',
        fields: {
          src: 'ImageGallery.[0].ImageUrl',
        },
      },
      {
        title: 'Title',
        component: CellComponent.StringCell,
        class: 'w-48',
        fields: {
          text: 'Detail.{language}.Title',
        },
      },
      {
        title: 'Categories',
        component: CellComponent.ArrayCell,
        class: 'w-40',
        fields: {
          items: 'AdditionalPoiInfos.{language}.Categories',
        },
        params: {
          separator: ', ',
        },
      },
      {
        title: 'Location',
        component: CellComponent.TextHighlightCell,
        class: 'w-40',
        fields: {
          title: 'LocationInfo.RegionInfo.Name.{language}',
          subtitle: 'LocationInfo.MunicipalityInfo.Name.{language}',
        },
      },
      {
        title: 'Languages',
        component: CellComponent.ArrayCell,
        class: 'w-40',
        fields: {
          items: 'HasLanguage',
        },
        params: {
          separator: ', ',
        },
        filter: {
          name: 'langfilter',
          component: FilterComponent.FixedValue,
          params: {
            multiselect: true,
            filterOptions: [
              {
                label: 'German',
                value: 'de',
              },
              {
                label: 'Italian',
                value: 'it',
              },
              {
                label: 'English',
                value: 'en',
              },
              {
                label: 'Dutch',
                value: 'nl',
              },
              {
                label: 'Polish',
                value: 'pl',
              },
              {
                label: 'French',
                value: 'fr',
              },
              {
                label: 'Russian',
                value: 'ru',
              },
            ],
          },
        },
      },
      {
        title: 'Edited',
        component: CellComponent.EditedDateCell,
        class: 'w-40',
        fields: {
          date: 'LastChange',
        },
        params: {
          format: 'dd. MMMM yyyy',
        },
      },
      {
        title: 'Source',
        component: CellComponent.StringCell,
        class: 'w-36',
        fields: {
          text: 'Source',
        },
      },
      {
        title: 'Source state',
        component: CellComponent.StateCell,
        class: 'w-40',
        fields: {
          state: 'Active',
        },
        filter: {
          name: 'active',
          component: FilterComponent.FixedValue,
          params: {
            filterOptions: [
              {
                label: 'Active',
                value: 'true',
              },
              {
                label: 'Not active',
                value: 'false',
              },
            ],
          },
        },
      },
      {
        title: 'ODH state',
        component: CellComponent.StateCell,
        class: 'w-40',
        fields: {
          state: 'OdhActive',
        },
        filter: {
          name: 'odhactive',
          component: FilterComponent.FixedValue,
          params: {
            filterOptions: [
              {
                label: 'Active',
                value: 'true',
              },
              {
                label: 'Not active',
                value: 'false',
              },
            ],
          },
        },
      },
    ],
  },
  detailEndpoint: {
    url: `${tourismBaseUrl}/v1/ODHActivityPoi/{id}`,
    viewConfig: [
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
                title: 'Custom ID',
                component: CellComponent.StringCell,
                fields: { text: 'CustomId' },
                class: 'break-all',
              },
              {
                title: 'Outdoor Active ID',
                component: CellComponent.StringCell,
                fields: { text: 'OutdooractiveID' },
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
                title: 'Active on ODH',
                component: CellComponent.StringCell,
                fields: { text: 'OdhActive' },
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
              {
                title: 'Interface',
                component: CellComponent.StringCell,
                fields: { text: 'SyncSourceInterface' },
              },
              {
                title: 'Update mode',
                component: CellComponent.StringCell,
                fields: { text: 'SyncUpdateMode' },
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
            name: 'Text data',
            properties: [
              {
                title: 'Meta title',
                component: CellComponent.StringCell,
                fields: { text: 'Detail.{language}.MetaTitle' },
              },
              {
                title: 'Meta description',
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
                fields: { text: 'Detail.{language}.SubHeader' },
              },
              {
                title: 'Introtext',
                component: CellComponent.StringCell,
                fields: { text: 'Detail.{language}.IntroText' },
              },
              {
                title: 'Base Text',
                component: CellComponent.HtmlCell,
                fields: { html: 'Detail.{language}.BaseText' },
              },
              {
                title: 'Additional Text',
                component: CellComponent.HtmlCell,
                fields: { html: 'Detail.{language}.AdditionalText' },
              },
              {
                title: 'Get There Text',
                component: CellComponent.HtmlCell,
                fields: { html: 'Detail.{language}.GetThereText' },
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
                fields: { text: '' },
              },
              {
                title: 'Gastronomy',
                component: CellComponent.StringCell,
                fields: { text: '' },
              },
              {
                title: 'Event',
                component: CellComponent.StringCell,
                fields: { text: '' },
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
              {
                title: 'Complement',
                component: CellComponent.StringCell,
                fields: { text: '' },
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
              {
                title: 'Additional URL (Independent URL)',
                component: CellComponent.StringCell,
                fields: { text: '' },
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
        name: 'Season / Opening Hours',
        slug: 'season-opening-hours',
        subcategories: [],
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
        name: 'GPS Data',
        slug: 'gps-data',
        subcategories: [
          {
            name: 'GPS Data',
            properties: [
              {
                title: '',
                component: CellComponent.GpsListCell,
                fields: { gpsEntries: 'GpsInfo' },
                params: {
                  type: 'Gpstype',
                  latitude: 'Latitude',
                  longitude: 'Longitude',
                  altitude: 'Altitude',
                  altitudeUnit: 'AltitudeUnitofMeasure',
                },
              },
            ],
          },
        ],
      },
      {
        name: 'Files',
        slug: 'files',
        subcategories: [],
      },
      {
        name: 'Tags',
        slug: 'tags',
        subcategories: [],
      },
      {
        name: 'Ratings',
        slug: 'ratings',
        subcategories: [
          {
            name: 'Rating Data',
            properties: [
              {
                title: 'Stamina',
                component: CellComponent.StringCell,
                fields: { text: 'Ratings.Stamina' },
              },
              {
                title: 'Experience',
                component: CellComponent.StringCell,
                fields: { text: 'Ratings.Experience' },
              },
              {
                title: 'Landscape',
                component: CellComponent.StringCell,
                fields: { text: 'Ratings.Landscape' },
              },
              {
                title: 'Difficulty',
                component: CellComponent.StringCell,
                fields: { text: 'Ratings.Difficulty' },
              },
              {
                title: 'Technique',
                component: CellComponent.StringCell,
                fields: { text: 'Ratings.Technique' },
              },
            ],
          },
        ],
      },
      {
        name: 'Activity Details',
        slug: 'activity-details',
        subcategories: [
          {
            name: 'Characteristics',
            properties: [],
          },
          {
            name: 'Additional Information',
            properties: [],
          },
          {
            name: 'Target Group',
            properties: [],
          },
        ],
      },
      {
        name: 'POI Details',
        slug: 'poi-details',
        subcategories: [
          {
            name: 'General',
            properties: [
              {
                title: 'Main type / Type',
                component: CellComponent.StringCell,
                fields: { text: 'AdditionalPoiInfos.{language}.MainType' },
              },
              {
                title: 'Sub Type',
                component: CellComponent.StringCell,
                fields: { text: 'AdditionalPoiInfos.{language}.SubType' },
              },
              {
                title: 'POI Type',
                component: CellComponent.StringCell,
                fields: { text: 'AdditionalPoiInfos.{language}.PoiType' },
              },
              {
                title: 'Novelty',
                component: CellComponent.StringCell,
                fields: { text: 'AdditionalPoiInfos.{language}.Novelty' },
              },
            ],
          },
        ],
      },
      {
        name: 'Webcam Details',
        slug: 'webcam-details',
        subcategories: [
          {
            name: 'Webcam',
            properties: [
              {
                title: '',
                component: CellComponent.WebcamGalleryCell,
                fields: { webcams: 'Webcam' },
                params: {
                  name: 'Webcamname.{language}',
                  image: 'Webcamurl',
                  imageUrl: 'Webcamurl',
                  latitude: 'GpsInfo.Latitude',
                  longitude: 'GpsInfo.Longitude',
                  altitude: 'GpsInfo.Altitude',
                  listPosition: 'ListPosition',
                },
              },
            ],
          },
        ],
      },
    ],
  },
};
