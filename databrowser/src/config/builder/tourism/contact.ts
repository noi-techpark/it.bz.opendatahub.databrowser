// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import { DetailElements } from '../../../domain/datasetConfig/types';

export const contactCategory = (): DetailElements => ({
  name: 'Contact',
  slug: 'contact',
  subcategories: [
    {
      name: 'Name and Company Data',
      properties: [
        {
          title: 'Name',
          component: CellComponent.StringCell,
          propertyMappings: { text: 'ContactInfos.{language}.CompanyName' },
        },
        {
          title: 'First Name',
          component: CellComponent.StringCell,
          propertyMappings: { text: 'ContactInfos.{language}.Givenname' },
        },
        {
          title: 'Surname',
          component: CellComponent.StringCell,
          propertyMappings: { text: 'ContactInfos.{language}.Surname' },
        },
        {
          title: 'Name prefix',
          component: CellComponent.StringCell,
          propertyMappings: { text: 'ContactInfos.{language}.NamePrefix' },
        },
        {
          title: 'Tax Number',
          component: CellComponent.StringCell,
          propertyMappings: { text: 'ContactInfos.{language}.Tax' },
        },
        {
          title: 'Vat-ID',
          component: CellComponent.StringCell,
          propertyMappings: { text: 'ContactInfos.{language}.Vat' },
        },
      ],
    },
    {
      name: 'Address',
      properties: [
        {
          title: 'Street and House No',
          component: CellComponent.StringCell,
          propertyMappings: { text: 'ContactInfos.{language}.Address' },
        },
        {
          title: 'ZIP-Code',
          component: CellComponent.StringCell,
          propertyMappings: { text: 'ContactInfos.{language}.ZipCode' },
        },
        {
          title: 'City',
          component: CellComponent.StringCell,
          propertyMappings: { text: 'ContactInfos.{language}.City' },
        },
        {
          title: 'Country',
          component: CellComponent.StringCell,
          propertyMappings: { text: 'ContactInfos.{language}.CountryName' },
        },
        {
          title: 'Country Abbrevation',
          component: CellComponent.StringCell,
          propertyMappings: { text: 'ContactInfos.{language}.CountryCode' },
        },
      ],
    },
    {
      name: 'Contact Details',
      properties: [
        {
          title: 'E-Mail',
          component: CellComponent.StringCell,
          propertyMappings: { text: 'ContactInfos.{language}.Email' },
        },
        {
          title: 'Phone Number',
          component: CellComponent.StringCell,
          propertyMappings: { text: 'ContactInfos.{language}.Phonenumber' },
        },
        {
          title: 'Web-URL',
          component: CellComponent.UrlCell,
          propertyMappings: { text: 'ContactInfos.{language}.Url' },
        },
      ],
    },
  ],
});

export const accoContactCategory = (): DetailElements => ({
  name: 'Contact',
  slug: 'contact',
  subcategories: [
    {
      name: 'Name and Company Data',
      properties: [
        {
          title: 'Name',
          component: CellComponent.StringCell,
          propertyMappings: { text: 'AccoDetail.{language}.Name' },
        },
        {
          title: 'First Name',
          component: CellComponent.StringCell,
          propertyMappings: { text: 'AccoDetail.{language}.Firstname' },
        },
        {
          title: 'Surname',
          component: CellComponent.StringCell,
          propertyMappings: { text: 'AccoDetail.{language}.Lastname' },
        },
      ],
    },
    {
      name: 'Address',
      properties: [
        {
          title: 'Street and House No',
          component: CellComponent.StringCell,
          propertyMappings: { text: 'AccoDetail.{language}.Street' },
        },
        {
          title: 'ZIP-Code',
          component: CellComponent.StringCell,
          propertyMappings: { text: 'AccoDetail.{language}.Zip' },
        },
        {
          title: 'City',
          component: CellComponent.StringCell,
          propertyMappings: { text: 'AccoDetail.{language}.City' },
        },
        {
          title: 'Country Abbreviation',
          component: CellComponent.StringCell,
          propertyMappings: { text: 'AccoDetail.{language}.CountryCode' },
        },
      ],
    },
    {
      name: 'Contact Details',
      properties: [
        {
          title: 'E-Mail',
          component: CellComponent.StringCell,
          propertyMappings: { text: 'AccoDetail.{language}.Email' },
        },
        {
          title: 'Phone Number',
          component: CellComponent.StringCell,
          propertyMappings: { text: 'AccoDetail.{language}.Phone' },
        },
        {
          title: 'Web-URL',
          component: CellComponent.UrlCell,
          propertyMappings: { text: 'AccoDetail.{language}.Website' },
        },
      ],
    },
  ],
});
