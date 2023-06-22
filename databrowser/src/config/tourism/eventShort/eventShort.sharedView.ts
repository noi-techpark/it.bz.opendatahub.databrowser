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
} from '../../builder/tourism';
import { publishedOnCell } from '../../builder/tourism/publishedOn';
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
              title: 'Title',
              component: CellComponent.StringCell,
              fields: { text: 'EventTitle.{language}' },
            },
            {
              title: 'Description',
              component: CellComponent.TextAreaCell,
              fields: { text: 'EventText.{language}' },
              params: { rows: '4' },
            },
            {
              title: 'Organizer',
              component: CellComponent.StringCell,
              fields: { text: 'CompanyName' },
            },
            {
              title: 'External organizer',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'ExternalOrganizer' },
            },
            {
              title: 'Sold out',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'SoldOut' },
            },
          ],
        },
        {
          name: 'IDs',
          properties: [idReadOnlyCell()],
        },
        {
          name: 'Data states',
          properties: [
            {
              title: 'Active',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'ActiveToday' },
            },
            {
              title: 'noi.bz.it Active',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'ActiveWeb' },
            },
            {
              title: 'NOI Community App Active',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'ActiveCommunityApp' },
            },
            publishedOnCell(),
          ],
        },
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
              fields: { text: 'WebAddress' },
              class: 'break-all',
            },
            {
              title: 'Video-URL',
              component: CellComponent.UrlCell,
              fields: { text: 'VideoUrl' },
              class: 'break-all',
            },
            {
              title: 'Date start',
              component: CellComponent.DateCell,
              fields: { date: 'StartDate' },
              params: { format: DEFAULT_DATE_TIME_FORMAT, type: 'datetime' },
              required: true,
            },
            {
              title: 'Date end',
              component: CellComponent.DateCell,
              fields: { date: 'EndDate' },
              params: { format: DEFAULT_DATE_TIME_FORMAT, type: 'datetime' },
              required: true,
            },
            {
              title: 'Room name',
              component: CellComponent.StringCell,
              fields: { text: 'AnchorVenue' },
            },
            {
              title: 'Age From',
              component: CellComponent.StringCell,
              fields: { text: 'TypicalAgeRange.AgeFrom' },
            },
            {
              title: 'Age To',
              component: CellComponent.StringCell,
              fields: { text: 'TypicalAgeRange.AgeTo' },
            },
            {
              title: 'Location',
              component: CellComponent.SelectWithOptionsCell,
              fields: { value: 'EventLocation' },
              params: {
                value_001: 'NOI',
                label_001: 'NOI',
                value_002: 'EC',
                label_002: 'Eurac',
                value_003: 'VV',
                label_003: 'Virtual Village',
                value_004: 'OUT',
                label_004: 'Other',
              },
              class: 'mb-8',
              required: true,
            },
            {
              title: 'Technology Fields',
              component: CellComponent.TagCell,
              listFields: {
                attributeName: 'tags',
                pathToParent: 'TechnologyFields',
              },
              params: {
                value_001: 'Automotive/Automation',
                label_001: 'Automotive/Automation',
                value_002: 'Digital',
                label_002: 'Digital',
                value_003: 'Food',
                label_003: 'Food & Health',
                value_004: 'Green',
                label_004: 'Green',
                unique: 'true',
              },
              class: 'mb-8',
            },
            {
              title: 'Tagging Fields',
              component: CellComponent.TagCell,
              listFields: {
                attributeName: 'tags',
                pathToParent: 'CustomTagging',
              },
              params: {
                value_001: 'Arts&Culture',
                label_001: 'Arts&Culture',
                value_002: 'Square',
                label_002: 'Square',
                value_003: 'Camp4Company',
                label_003: 'Camp4Company',
                value_004: 'MiniNOI',
                label_004: 'MiniNOI',
                value_005: 'Out of the Lab',
                label_005: 'Out of the Lab',
                value_006: 'Summer at NOI',
                label_006: 'Summer at NOI',
                value_007: 'Public',
                label_007: 'Public',
                value_008: 'NOI Community',
                label_008: 'NOI Community',
                value_009: 'Balboa x NOI Into Action',
                label_009: 'Balboa x NOI Into Action',
                unique: 'true',
              },
              class: 'mb-8',
            },
            {
              title: 'Room Management',
              component: CellComponent.EditRoomBookedCell,
              listFields: {
                pathToParent: 'RoomBooked',
                fields: {
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
    {
      name: 'License',
      slug: 'license',
      subcategories: [
        {
          name: '',
          properties: [
            {
              title: 'License',
              component: CellComponent.SelectWithOptionsCell,
              fields: { value: 'LicenseInfo.License' },
              params: {
                value_001: 'CC0',
                label_001: 'CC0',
                value_002: 'CC-BY',
                label_002: 'CC-BY',
                value_003: 'Closed',
                label_003: 'Closed',
              },
            },
            {
              title: 'Author',
              component: CellComponent.StringCell,
              fields: { text: 'LicenseInfo.Author' },
            },
            {
              title: 'License Holder',
              component: CellComponent.UrlCell,
              fields: { text: 'LicenseInfo.LicenseHolder' },
            },
            {
              title: 'Closed Data',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'LicenseInfo.ClosedData' },
            },
          ],
        },
      ],
    },
  ],
});
