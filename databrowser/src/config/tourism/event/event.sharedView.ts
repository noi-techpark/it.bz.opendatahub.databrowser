// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailViewConfig,
  EditViewConfig,
} from '../../../domain/datasetConfig/types';
import {
  contactCategory,
  dataStatesSubCategory,
  gpsDataCategory,
  imageGalleryCategory,
  odhTagCategory,
  shortnameWithLogoAndMainImageSubCategory,
  sourceSubCategory,
  textInfoCategory,
  licenseInfoCategory,
  idReadOnlyCell,
  locationCategory,
} from '../../builder/tourism';
import { DEFAULT_DATE_TIME_FORMAT } from '../../utils';

export const eventSharedView = (): DetailViewConfig | EditViewConfig => ({
  elements: [
    {
      name: 'Main data',
      slug: 'main-data',
      subcategories: [
        shortnameWithLogoAndMainImageSubCategory(),
        {
          name: 'IDs',
          properties: [
            idReadOnlyCell(),
            {
              title: 'Area Id',
              component: CellComponent.StringCell,
              objectMappings: { text: 'LocationInfo.AreaInfo.Id' },
            },
          ],
        },
        dataStatesSubCategory(),
        sourceSubCategory(),
      ],
    },
    textInfoCategory(),
    contactCategory(),
    imageGalleryCategory(),
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
              objectMappings: { date: 'DateBegin' },
              params: { type: 'datetime', format: DEFAULT_DATE_TIME_FORMAT },
            },
            {
              title: 'Date End',
              component: CellComponent.DateCell,
              objectMappings: { date: 'EventDatesEnd' },
              params: { type: 'datetime', format: DEFAULT_DATE_TIME_FORMAT },
            },
            {
              title: 'Entrance',
              component: CellComponent.StringCell,
              objectMappings: { text: 'Entrance' },
            },
          ],
        },
        {
          name: 'Organizer Info',
          properties: [
            {
              title: 'Company / Name',
              component: CellComponent.StringCell,
              objectMappings: { text: 'ContactInfos.{language}.CompanyName' },
            },
            {
              title: 'Tax Number',
              component: CellComponent.StringCell,
              objectMappings: { text: 'ContactInfos.{language}.Tax' },
            },
            {
              title: 'Vat',
              component: CellComponent.StringCell,
              objectMappings: { text: 'ContactInfos.{language}.Vat' },
            },
          ],
        },
        {
          name: 'Address',
          properties: [
            {
              title: 'Address',
              component: CellComponent.StringCell,
              objectMappings: { text: 'ContactInfos.{language}.Address' },
            },
            {
              title: 'Zip Code',
              component: CellComponent.StringCell,
              objectMappings: { text: 'ContactInfos.{language}.ZipCode' },
            },
            {
              title: 'Country Name',
              component: CellComponent.StringCell,
              objectMappings: { text: 'ContactInfos.{language}.CountryName' },
            },
            {
              title: 'Country Code',
              component: CellComponent.StringCell,
              objectMappings: { text: 'ContactInfos.{language}.CountryCode' },
            },
          ],
        },
        {
          name: 'Contact details',
          properties: [
            {
              title: 'Email',
              component: CellComponent.StringCell,
              objectMappings: { text: 'ContactInfos.{language}.Email' },
            },
            {
              title: 'Phonenumber',
              component: CellComponent.StringCell,
              objectMappings: { text: 'ContactInfos.{language}.Phonenumber' },
            },
            {
              title: 'Url',
              component: CellComponent.StringCell,
              objectMappings: { text: 'ContactInfos.{language}.Url' },
            },
          ],
        },
        {
          name: 'Characteristics',
          properties: [
            {
              title: 'Single Days',
              component: CellComponent.StringCell,
              objectMappings: { text: 'EventDate.SingleDays' },
            },
            {
              title: 'Ticket',
              component: CellComponent.StringCell,
              objectMappings: { text: 'Ticket' },
            },
          ],
        },
        {
          name: 'Price',
          properties: [
            {
              title: 'Event Price',
              component: CellComponent.StringCell,
              objectMappings: { text: 'EventPrice.0' },
            },
            {
              title: 'Type',
              component: CellComponent.StringCell,
              objectMappings: { text: 'Type' },
            },
          ],
        },
        {
          name: 'Additional Information',
          properties: [
            {
              title: 'MinPersons',
              component: CellComponent.StringCell,
              objectMappings: { text: 'EventDate.MinPersons' },
            },
            {
              title: 'MaxPersons',
              component: CellComponent.StringCell,
              objectMappings: { text: 'EventDate.MaxPersons' },
            },
            {
              title: 'Ranc',
              component: CellComponent.StringCell,
              objectMappings: { text: 'EventDate.Ranc' },
            },
            {
              title: 'SignOn',
              component: CellComponent.StringCell,
              objectMappings: { text: 'SignOn' },
            },
            {
              title: 'PayMet',
              component: CellComponent.StringCell,
              objectMappings: { text: 'PayMet' },
            },
            {
              title: 'Topics',
              component: CellComponent.ArrayTagsCell,
              objectMappings: {
                items: 'Topics',
              },
              params: {
                propertyName: 'TopicInfo',
                separator: ', ',
                max: '3',
              },
            },
          ],
        },
      ],
    },
    locationCategory(),
    gpsDataCategory(),
    odhTagCategory('event'),
    licenseInfoCategory(),
    {
      name: 'Other',
      slug: 'other',
      subcategories: [
        {
          name: 'Various Ids',
          properties: [
            {
              title: 'Area Id',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'LocationInfo.AreaInfo.Id' },
            },
          ],
        },
        {
          name: 'Deprecated',
          properties: [
            {
              title: 'Active on Open Data Hub',
              component: CellComponent.ToggleCell,
              propertyMappings: { enabled: 'SmgActive' },
            },
          ],
        },
      ],
    },
  ],
});
