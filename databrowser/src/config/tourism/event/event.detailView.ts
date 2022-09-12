import { CellComponent } from '../../../domain/cellComponents/types';
import { DetailViewConfig } from '../../../domain/datasetConfig/types';

export const eventDetailView: DetailViewConfig = {
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
              title: 'Logo',
              component: CellComponent.ImageCell,
              fields: {
                src: 'ContactInfos.{language}.LogoUrl',
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
          name: 'Ids',
          properties: [
            {
              title: 'Tv Info',
              component: CellComponent.StringCell,
              fields: { text: 'LocationInfo.TvInfo.Id' },
            },
            {
              title: 'Region Id',
              component: CellComponent.StringCell,
              fields: { text: 'LocationInfo.RegionInfo.Id' },
            },
            {
              title: 'Area Id',
              component: CellComponent.StringCell,
              fields: { text: 'LocationInfo.AreaInfo.Id' },
            },
            {
              title: 'Municipality Id',
              component: CellComponent.StringCell,
              fields: { text: 'LocationInfo.MunicipalityInfo.Id' },
            },
            {
              title: 'District Id',
              component: CellComponent.StringCell,
              fields: { text: 'DistrictId' },
            },
          ],
        },
        {
          name: 'Data States',
          properties: [
            {
              title: 'Last Changes',
              component: CellComponent.DateCell,
              fields: { date: '_Meta.LastUpdate' },
              params: {
                format: 'do MMMM yyyy HH:mm',
              },
            },
            {
              title: 'Active',
              component: CellComponent.StringCell,
              fields: { text: 'Active' },
            },
            {
              title: 'SMG Active',
              component: CellComponent.StringCell,
              fields: { text: 'SmgActive' },
            },
            {
              title: 'ODH Active',
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
              fields: { text: '_Meta.Source' },
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
              title: 'Meta Description',
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
              title: 'Sub Header',
              component: CellComponent.StringCell,
              fields: { text: 'Detail.{language}.SubHeader' },
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
              title: 'GetThereText',
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
            {
              title: 'License',
              component: CellComponent.StringCell,
              fields: {
                text: 'LicenseInfo.License',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'GPS Data',
      slug: 'GPS-data',
      subcategories: [
        {
          name: 'General data',
          properties: [
            {
              title: 'Gps Type',
              component: CellComponent.StringCell,
              fields: { text: 'Gpstype' },
            },
            {
              title: 'Latitude',
              component: CellComponent.StringCell,
              fields: { text: 'Latitude' },
            },
            {
              title: 'Longitude',
              component: CellComponent.StringCell,
              fields: { text: 'Longitude' },
            },
            {
              title: 'Altitude',
              component: CellComponent.StringCell,
              fields: { text: 'Altitude' },
            },
            {
              title: 'Altitude Unit',
              component: CellComponent.StringCell,
              fields: { text: 'GpsPoints.position.AltitudeUnitofMeasure' },
            },
          ],
        },
      ],
    },
    {
      name: 'Files',
      slug: 'files',
      subcategories: [
        {
          name: 'General data',
          properties: [
            {
              title: 'PDF',
              component: CellComponent.StringCell,
              fields: { text: 'Pdf' },
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
          name: 'General data',
          properties: [
            {
              title: 'SMG Tags',
              component: CellComponent.StringCell,
              fields: { text: 'SmgTags' },
            },
            {
              title: 'ODH Tags',
              component: CellComponent.ArrayCell,
              fields: { text: 'ODHTags' },
            },
          ],
        },
      ],
    },
    {
      name: 'Event details',
      slug: 'Event-details',
      subcategories: [
        {
          name: 'Time and date',
          properties: [
            {
              title: 'Date Begin',
              component: CellComponent.DateCell,
              fields: { date: 'DateBegin' },
              params: {
                format: 'do MMMM yyyy',
              },
            },
            {
              title: 'Date End',
              component: CellComponent.DateCell,
              fields: { date: 'EventDatesEnd' },
              params: {
                format: 'do MMMM yyyy',
              },
            },
            {
              title: 'Entrance',
              component: CellComponent.StringCell,
              fields: { text: 'Entrance' },
            },
            {
              title: 'Start',
              component: CellComponent.StringCell,
              fields: { text: 'EventDate.Begin' },
            },
            {
              title: 'End',
              component: CellComponent.StringCell,
              fields: { text: 'EventDate.End' },
            },
          ],
        },
        {
          name: 'Organizer Info',
          properties: [
            {
              title: 'CompanyName',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.CompanyName' },
            },
            {
              title: 'Tax Number',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.Tax' },
            },
            {
              title: 'Vat',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.Vat' },
            },
          ],
        },
        {
          name: 'Address',
          properties: [
            {
              title: 'Address',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.Address' },
            },
            {
              title: 'Zip Code',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.ZipCode' },
            },
            {
              title: 'Country Name',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.CountryName' },
            },
            {
              title: 'Country Code',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.CountryCode' },
            },
          ],
        },
        {
          name: 'Contact details',
          properties: [
            {
              title: 'Email',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.Email' },
            },
            {
              title: 'Phonenumber',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.Phonenumber' },
            },
            {
              title: 'Url',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.Url' },
            },
          ],
        },
        {
          name: 'Location',
          properties: [
            {
              title: 'Location',
              component: CellComponent.StringCell,
              fields: { text: 'LocationInfo.TvInfo.Name.{language}' },
            },
            {
              title: 'Region Name',
              component: CellComponent.StringCell,
              fields: { text: 'LocationInfo.RegionInfo.Name.{language}' },
            },
          ],
        },
        {
          name: 'Characteristics',
          properties: [
            {
              title: 'Single Days',
              component: CellComponent.StringCell,
              fields: { text: 'EventDate.SingleDays' },
            },
            {
              title: 'Ticket',
              component: CellComponent.StringCell,
              fields: { text: 'Ticket' },
            },
          ],
        },
        {
          name: 'Price',
          properties: [
            {
              title: 'Event Price',
              component: CellComponent.StringCell,
              fields: { text: 'EventPrice.0' },
            },
            {
              title: 'Type',
              component: CellComponent.StringCell,
              fields: { text: 'Type' },
            },
          ],
        },
        {
          name: 'Additional Information',
          properties: [
            {
              title: 'MinPersons',
              component: CellComponent.StringCell,
              fields: { text: 'EventDate.MinPersons' },
            },
            {
              title: 'MaxPersons',
              component: CellComponent.StringCell,
              fields: { text: 'EventDate.MaxPersons' },
            },
            {
              title: 'Ranc',
              component: CellComponent.StringCell,
              fields: { text: 'EventDate.Ranc' },
            },
            {
              title: 'SignOn',
              component: CellComponent.StringCell,
              fields: { text: 'SignOn' },
            },
            {
              title: 'PayMet',
              component: CellComponent.StringCell,
              fields: { text: 'PayMet' },
            },
            {
              title: 'Topics',
              component: CellComponent.StringCell,
              fields: { text: 'Topics' },
            },
          ],
        },
      ],
    },
  ],
};
