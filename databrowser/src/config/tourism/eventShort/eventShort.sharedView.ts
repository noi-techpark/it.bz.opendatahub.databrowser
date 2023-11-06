// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailViewConfig,
  EditViewConfig,
} from '../../../domain/datasetConfig/types';
import {
  eventDocumentCategory,
  idReadOnlyCell,
  imageGalleryCategory,
  licenseInfoCategory,
  lastChangesCell,
  sourceSubCategory,
} from '../../builder/tourism';
import { publishedOnCell } from '../../builder/tourism/publishedOn';
import { withOdhBaseUrl } from '../../utils';
import { DEFAULT_DATE_TIME_FORMAT } from '../../utils';

export const eventShortSharedView = (): DetailViewConfig | EditViewConfig => ({
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
              propertyMappings: { text: 'Shortname' },
            },
            {
              title: 'Title',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'EventTitle.{language}' },
            },
            {
              title: 'Description',
              component: CellComponent.TextAreaCell,
              propertyMappings: { text: 'EventText.{language}' },
              params: { rows: '4' },
            },
            {
              title: 'Organizer',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'CompanyName' },
            },
            {
              title: 'External organizer',
              component: CellComponent.ToggleCell,
              propertyMappings: { enabled: 'ExternalOrganizer' },
            },
            {
              title: 'Sold out',
              component: CellComponent.ToggleCell,
              propertyMappings: { enabled: 'SoldOut' },
            },
          ],
        },
        {
          name: 'IDs',
          properties: [idReadOnlyCell()],
        },
        {
          name: 'Data states',
          properties: [lastChangesCell(), publishedOnCell()],
        },
        sourceSubCategory(),
      ],
    },
    {
      name: 'Event details',
      slug: 'event-details',
      subcategories: [
        {
          name: '',
          properties: [
            {
              title: 'Web-URL',
              component: CellComponent.UrlCell,
              propertyMappings: { text: 'WebAddress' },
              class: 'break-all',
            },
            {
              title: 'Video-URL',
              component: CellComponent.UrlCell,
              propertyMappings: { text: 'VideoUrl' },
              class: 'break-all',
            },
            {
              title: 'Date start',
              component: CellComponent.DateCell,
              propertyMappings: { date: 'StartDate' },
              params: { format: DEFAULT_DATE_TIME_FORMAT, type: 'datetime' },
              required: true,
            },
            {
              title: 'Date end',
              component: CellComponent.DateCell,
              propertyMappings: { date: 'EndDate' },
              params: { format: DEFAULT_DATE_TIME_FORMAT, type: 'datetime' },
              required: true,
            },
            {
              title: 'Room name',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'AnchorVenue' },
            },
            {
              title: 'Age From',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'TypicalAgeRange.AgeFrom' },
            },
            {
              title: 'Age To',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'TypicalAgeRange.AgeTo' },
            },
            {
              title: 'Location',
              component: CellComponent.InputReferenceCell,
              propertyMappings: { value: 'EventLocation' },
              params: {
                url: withOdhBaseUrl('/v1/EventShortTypes?type=EventLocation'),
                labelSelector: 'TypeDesc.{language}',
                keySelector: 'Key',
              },
              required: true,
            },
            {
              title: 'Technology Fields',
              component: CellComponent.TagReferenceCell,
              listFields: {
                attributeName: 'tags',
                pathToParent: 'TechnologyFields',
              },
              params: {
                url: withOdhBaseUrl(
                  '/v1/EventShortTypes?type=TechnologyFields'
                ),
                labelSelector: 'TypeDesc.{language}',
                keySelector: 'Key',
                unique: 'true',
              },
            },
            {
              title: 'Tagging Fields',
              component: CellComponent.TagReferenceCell,
              listFields: {
                attributeName: 'tags',
                pathToParent: 'CustomTagging',
              },
              params: {
                url: withOdhBaseUrl('/v1/EventShortTypes?type=CustomTagging'),
                labelSelector: 'TypeDesc.{language}',
                keySelector: 'Key',
                unique: 'true',
              },
            },
            {
              title: 'Room Management',
              component: CellComponent.EditRoomBookedCell,
              listFields: {
                pathToParent: 'RoomBooked',
                propertyMappings: {
                  space: 'Space',
                  spaceDesc: 'SpaceDesc',
                  spaceAbbrev: 'SpaceAbbrev',
                  spaceType: 'SpaceType',
                  subtitle: 'Subtitle',
                  comment: 'Comment',
                  startDate: 'StartDate',
                  endDate: 'EndDate',
                  startDateUTC: 'StartDateUTC',
                  endDateUTC: 'EndDateUTC',
                  spaceDescRoomMapping: 'SpaceDescRoomMapping',
                },
                attributeName: 'roomBooked',
              },
            },
          ],
        },
      ],
    },
    imageGalleryCategory(),
    eventDocumentCategory(),
    licenseInfoCategory(),
    {
      name: 'Other',
      slug: 'other',
      subcategories: [
        {
          name: 'Various Ids',
          properties: [
            {
              title: 'Event EBMS Id',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'EventId' },
            },
          ],
        },
        {
          name: 'Deprecated',
          properties: [
            {
              title: 'Active',
              component: CellComponent.ToggleCell,
              propertyMappings: { enabled: 'ActiveToday' },
              params: { readonly: 'true' },
            },
            {
              title: 'noi.bz.it Active',
              component: CellComponent.ToggleCell,
              propertyMappings: { enabled: 'ActiveWeb' },
              params: { readonly: 'true' },
            },
            {
              title: 'NOI Community App Active',
              component: CellComponent.ToggleCell,
              propertyMappings: { enabled: 'ActiveCommunityApp' },
              params: { readonly: 'true' },
            },
          ],
        },
      ],
    },
  ],
});
