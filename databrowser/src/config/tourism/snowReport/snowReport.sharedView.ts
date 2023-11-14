// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailViewConfig,
  EditViewConfig,
} from '../../../domain/datasetConfig/types';
import { idReadOnlyCell } from '../../builder/tourism';
import { DEFAULT_DATE_TIME_FORMAT } from '../../utils';

export const snowReportSharedView = (): DetailViewConfig | EditViewConfig => ({
  elements: [
    {
      name: 'Main data',
      slug: 'main-data',
      subcategories: [
        {
          name: 'Area name',
          properties: [
            {
              title: '',
              component: CellComponent.StringCell,
              objectMappings: { text: 'Areaname' },
            },
            idReadOnlyCell(),
            {
              title: 'RID',
              component: CellComponent.StringCell,
              objectMappings: { text: 'RID' },
            },
            {
              title: 'Ski Region',
              component: CellComponent.StringCell,
              objectMappings: { text: 'Skiregion' },
            },
            {
              title: 'Logo',
              component: CellComponent.ImageEditCell,
              objectMappings: { src: 'contactlogo' },
              params: { width: '200' },
            },
            {
              title: 'Ski Map',
              component: CellComponent.ImageEditCell,
              objectMappings: {
                src: 'SkiMapUrl',
              },
              params: {
                width: '100%',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'Measurements',
      slug: 'measurements',
      subcategories: [
        {
          name: '',
          properties: [
            {
              title: 'Shortname',
              component: CellComponent.StringCell,
              objectMappings: { text: 'Measuringpoints.0.Shortname' },
            },
            {
              title: 'Last Update',
              component: CellComponent.DateCell,
              objectMappings: { date: 'Measuringpoints.0.LastUpdate' },
              params: {
                type: 'datetime',
                format: DEFAULT_DATE_TIME_FORMAT,
                readonly: 'true',
              },
            },
            {
              title: 'Snow Height',
              component: CellComponent.StringCell,
              objectMappings: { text: 'Measuringpoints.0.SnowHeight' },
            },
            {
              title: 'New Snow Height',
              component: CellComponent.StringCell,
              objectMappings: { text: 'Measuringpoints.0.newSnowHeight' },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              objectMappings: { text: 'Measuringpoints.0.Temperature' },
            },
            {
              title: 'Last Snow Date',
              component: CellComponent.DateCell,
              objectMappings: { date: 'Measuringpoints.0.LastSnowDate' },
              params: {
                format: DEFAULT_DATE_TIME_FORMAT,
              },
            },
            {
              title: 'Weather Observation',
              component: CellComponent.ArrayCell,
              objectMappings: {
                items: 'Measuringpoints.WeatherObservation',
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
      name: 'Webcam',
      slug: 'webcam',
      subcategories: [
        {
          name: '',
          properties: [
            {
              title: 'Webcam-Url',
              component: CellComponent.ArrayCell,
              objectMappings: {
                items: 'WebcamUrl',
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
      name: 'Skilift Details',
      slug: 'skilift',
      subcategories: [
        {
          name: '',
          properties: [
            {
              title: 'Total Skilift',
              component: CellComponent.StringCell,
              objectMappings: { text: 'totalskilift' },
            },
            {
              title: 'Open Skilift',
              component: CellComponent.StringCell,
              objectMappings: { text: 'openskilift' },
            },
            {
              title: 'Total Skilift km',
              component: CellComponent.StringCell,
              objectMappings: { text: 'totalskiliftkm' },
            },
            {
              title: 'Open Skilift km',
              component: CellComponent.StringCell,
              objectMappings: { text: 'openskiliftkm' },
            },
          ],
        },
      ],
    },
    {
      name: 'Skislopes Details',
      slug: 'skislopes',
      subcategories: [
        {
          name: '',
          properties: [
            {
              title: 'Ski Area slope km',
              component: CellComponent.StringCell,
              objectMappings: { text: 'SkiAreaSlopeKm' },
            },
            {
              title: 'Total Ski slopes',
              component: CellComponent.StringCell,
              objectMappings: { text: 'totalskislopes' },
            },
            {
              title: 'Open Ski slopes',
              component: CellComponent.StringCell,
              objectMappings: { text: 'openskislopes' },
            },
            {
              title: 'Total Ski slopes km',
              component: CellComponent.StringCell,
              objectMappings: { text: 'totalskislopeskm' },
            },
            {
              title: 'Open Ski slopes km',
              component: CellComponent.StringCell,
              objectMappings: { text: 'openskislopeskm' },
            },
          ],
        },
      ],
    },
    {
      name: 'Tracks Details',
      slug: 'tracks',
      subcategories: [
        {
          name: '',
          properties: [
            {
              title: 'Total tracks',
              component: CellComponent.StringCell,
              objectMappings: { text: 'totaltracks' },
            },
            {
              title: 'Open tracks',
              component: CellComponent.StringCell,
              objectMappings: { text: 'opentracks' },
            },
            {
              title: 'Total tracks km',
              component: CellComponent.StringCell,
              objectMappings: { text: 'totaltrackskm' },
            },
            {
              title: 'Open tracks km',
              component: CellComponent.StringCell,
              objectMappings: { text: 'opentrackskm' },
            },
          ],
        },
      ],
    },
    {
      name: 'Slides Details',
      slug: 'slides',
      subcategories: [
        {
          name: '',
          properties: [
            {
              title: 'Total slides',
              component: CellComponent.StringCell,
              objectMappings: { text: 'totalslides' },
            },
            {
              title: 'Open slides',
              component: CellComponent.StringCell,
              objectMappings: { text: 'opentslides' },
            },
            {
              title: 'Total slides km',
              component: CellComponent.StringCell,
              objectMappings: { text: 'totalslideskm' },
            },
            {
              title: 'Open slides km',
              component: CellComponent.StringCell,
              objectMappings: { text: 'openslidesskm' },
            },
          ],
        },
      ],
    },
    {
      name: 'Iceskating Details',
      slug: 'iceSkating',
      subcategories: [
        {
          name: '',
          properties: [
            {
              title: 'Total ice skating',
              component: CellComponent.StringCell,
              objectMappings: { text: 'totaliceskating' },
            },
            {
              title: 'Open ice skating',
              component: CellComponent.StringCell,
              objectMappings: { text: 'openiceskating' },
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
              title: 'Name/Company Name/AreaName',
              component: CellComponent.StringCell,
              objectMappings: { text: 'Areaname' },
            },
          ],
        },
        {
          name: 'Address',
          properties: [
            {
              title: 'Street and House No',
              component: CellComponent.StringCell,
              objectMappings: { text: 'contactadress' },
            },
            {
              title: 'ZIP-Code',
              component: CellComponent.StringCell,
              objectMappings: { text: 'contactcap' },
            },
            {
              title: 'City',
              component: CellComponent.StringCell,
              objectMappings: { text: 'contactcity' },
            },
            {
              title: 'GPS North',
              component: CellComponent.StringCell,
              objectMappings: { text: 'contactgpsnorth' },
            },
            {
              title: 'GPS East',
              component: CellComponent.StringCell,
              objectMappings: { text: 'contactgpseast' },
            },
          ],
        },
        {
          name: 'Contact Details',
          properties: [
            {
              title: 'E-Mail',
              component: CellComponent.StringCell,
              objectMappings: { text: 'contactmail' },
            },
            {
              title: 'Phone Number',
              component: CellComponent.StringCell,
              objectMappings: { text: 'contacttel' },
            },
            {
              title: 'Web-URL',
              component: CellComponent.UrlCell,
              objectMappings: { text: 'contactweburl' },
            },
          ],
        },
      ],
    },
  ],
});
