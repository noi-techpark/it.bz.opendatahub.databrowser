import { EditViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';
import { withOdhBaseUrl } from '../../utils';
import { odhTagConfigWithMainEntity } from '../configBuilderListView';
import {
  IMAGE_GALLERY_CONFIG,
  ID_READONLY_CONFIG,
  LAST_CHANGES_CONFIG,
} from '../configBuilderCommonView';

export const accommodationEditView: EditViewConfig = {
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
              title: 'Accommodation type',
              component: CellComponent.InputReferenceCell,
              fields: { value: 'AccoTypeId' },
              params: {
                url: withOdhBaseUrl('/v1/AccommodationTypes'),
                labelSelector: 'TypeDesc.{language}',
                keySelector: 'Id',
              },
            },
            {
              title: 'Accommodation category',
              component: CellComponent.InputReferenceCell,
              fields: { value: 'AccoCategoryId' },
              params: {
                url: withOdhBaseUrl('/v1/AccommodationTypes'),
                labelSelector: 'TypeDesc.{language}',
                keySelector: 'Id',
              },
            },
            {
              title: 'Boardings',
              component: CellComponent.ArrayCell,
              class: 'w-40',
              fields: {
                items: 'BoardIds',
              },
              params: {
                separator: ', ',
              },
            },
          ],
        },
        {
          name: 'Characteristics',
          properties: [
            {
              title: 'Room',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'HasApartment' },
              class: 'break-all',
            },
            {
              title: 'Gastronomy',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'IsGastronomy' },
              class: 'break-all',
            },
            {
              title: 'Is Bookable',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'IsBookable' },
              class: 'break-all',
            },
            {
              title: 'Features',
              component: CellComponent.ArrayCellTags,
              class: 'w-40',
              fields: {
                items: 'Features',
              },
              params: {
                fieldName: 'Name',
                separator: ', ',
                max: '3',
              },
            },
            {
              title: 'Special Features',
              component: CellComponent.ArrayCell,
              class: 'w-40',
              fields: {
                items: 'SpecialFeaturesIds',
              },
              params: {
                separator: ', ',
              },
            },
            {
              title: 'Badges',
              component: CellComponent.ArrayCell,
              class: 'w-40',
              fields: {
                items: 'AccoBadges',
              },
              params: {
                separator: ', ',
              },
            },
          ],
        },
        {
          name: 'IDs',
          properties: [
            ID_READONLY_CONFIG,
            {
              title: 'Region ID',
              component: CellComponent.ArrayCell,
              class: 'w-40',
              fields: {
                items: 'RegionInfo',
              },
              params: {
                separator: ', ',
              },
            },
            {
              title: 'Municipality ID',
              component: CellComponent.ArrayCell,
              class: 'w-40',
              fields: {
                items: 'MunicipalityInfo',
              },
              params: {
                separator: ', ',
              },
            },
            {
              title: 'HGV ID',
              component: CellComponent.StringCell,
              fields: { text: 'HgvId' },
              class: 'break-all',
            },
            {
              title: 'District ID',
              component: CellComponent.StringCell,
              fields: { text: 'DistrictId' },
              class: 'break-all',
            },
            {
              title: 'Marketing Group IDs',
              component: CellComponent.ArrayCell,
              class: 'w-40',
              fields: {
                items: 'MarketingGroupIds',
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
              title: 'Active on SMG',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'SmgActive' },
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
              params: { readonly: 'true' },
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
            {
              title: 'Accommodation type',
              component: CellComponent.InputReferenceCell,
              fields: { value: 'AccoType.Id' },
              params: {
                url: withOdhBaseUrl('/v1/AccommodationTypes'),
                labelSelector: 'TypeDesc.{language}',
                keySelector: 'Id',
              },
              required: true,
            },
            {
              title: 'Accommodation category',
              component: CellComponent.InputReferenceCell,
              fields: { value: 'AccoCategory.Id' },
              params: {
                url: withOdhBaseUrl('/v1/AccommodationTypes'),
                labelSelector: 'TypeDesc.{language}',
                keySelector: 'Id',
              },
              required: true,
            },
            {
              title: 'Long description',
              component: CellComponent.StringCell,
              fields: { text: 'AccoDetail.{language}.Longdesc' },
            },
            {
              title: 'Short description',
              component: CellComponent.StringCell,
              fields: { text: 'AccoDetail.{language}.ShortDesc' },
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
              fields: { text: 'AccoDetail.{language}.Name' },
            },
            {
              title: 'First Name',
              component: CellComponent.StringCell,
              fields: { text: 'AccoDetail.{language}.Firstname' },
            },
            {
              title: 'Surname',
              component: CellComponent.StringCell,
              fields: { text: 'AccoDetail.{language}.Lastname' },
            },
          ],
        },
        {
          name: 'Address',
          properties: [
            {
              title: 'Street and House No',
              component: CellComponent.StringCell,
              fields: { text: 'AccoDetail.{language}.Street' },
            },
            {
              title: 'ZIP-Code',
              component: CellComponent.StringCell,
              fields: { text: 'AccoDetail.{language}.Zip' },
            },
            {
              title: 'City',
              component: CellComponent.StringCell,
              fields: { text: 'AccoDetail.{language}.City' },
            },
            {
              title: 'Country Abbreviation',
              component: CellComponent.StringCell,
              fields: { text: 'AccoDetail.{language}.CountryCode' },
            },
          ],
        },
        {
          name: 'Contact Details',
          properties: [
            {
              title: 'E-Mail',
              component: CellComponent.StringCell,
              fields: { text: 'AccoDetail.{language}.Email' },
            },
            {
              title: 'Phone Number',
              component: CellComponent.StringCell,
              fields: { text: 'AccoDetail.{language}.Phone' },
            },
            {
              title: 'Web-URL',
              component: CellComponent.StringCell,
              fields: { text: 'AccoDetail.{language}.Website' },
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
              component: CellComponent.GpsPointsCell,
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
          properties: [odhTagConfigWithMainEntity('accommodation')],
        },
      ],
    },
  ],
};
