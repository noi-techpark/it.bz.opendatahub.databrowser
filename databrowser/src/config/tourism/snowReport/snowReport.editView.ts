import { EditViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';

export const snowReportEditView: EditViewConfig = {
  elements: [
    {
      name: 'Main data',
      slug: 'main-data',
      subcategories: [
        {
          name: 'Shortname',
          properties: [
            {
              title: '',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'Areaname' },
            },
            {
              title: 'ID',
              component: CellComponent.StringCell,
              fields: { text: 'Id' },
            },
            {
              title: 'RID',
              component: CellComponent.StringCell,
              fields: { text: 'RID' },
            },
            {
              title: 'Ski Region',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'Skiregion' },
            },
            {
              title: 'Ski Map',
              component: CellComponent.ImageCell,
              class: 'w-40',
              fields: {
                src: 'SkiMapUrl',
              },
              params: {
                width: '100%',
              },
            },
            {
              title: 'Logo',
              component: CellComponent.ImageCell,
              class: 'w-40',
              fields: {
                src: 'contactlogo',
              },
              params: {
                width: '15%',
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
          name: 'Shortname',
          properties: [
            {
              title: '',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'Measuringpoints.0.Shortname' },
            },
            {
              title: 'ID',
              component: CellComponent.StringCell,
              fields: { text: 'Id' },
            },
            {
              title: 'Last Update',
              component: CellComponent.DateCell,
              fields: { date: 'Measuringpoints.0.LastUpdate' },
              params: {
                format: 'd/M/yyyy HH:mm',
              },
            },
            {
              title: 'Snow Height',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'Measuringpoints.0.SnowHeight' },
            },
            {
              title: 'New Snow Height',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'Measuringpoints.0.newSnowHeight' },
            },
            {
              title: 'Temperature',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'Measuringpoints.0.Temperature' },
            },
            {
              title: 'Last Snow Date',
              component: CellComponent.DateCell,
              fields: { date: 'Measuringpoints.0.LastSnowDate' },
              params: {
                format: 'd/M/yyyy HH:mm',
              },
            },
            {
              title: 'Weather Observation',
              component: CellComponent.ArrayCell,
              fields: {
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
              class: 'w-40',
              fields: {
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
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'totalskilift' },
            },
            {
              title: 'Open Skilift',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'openskilift' },
            },
            {
              title: 'Total Skilift km',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'totalskiliftkm' },
            },
            {
              title: 'Open Skilift km',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'openskiliftkm' },
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
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'SkiAreaSlopeKm' },
            },
            {
              title: 'Total Ski slopes',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'totalskislopes' },
            },
            {
              title: 'Open Ski slopes',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'openskislopes' },
            },
            {
              title: 'Total Ski slopes km',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'totalskislopeskm' },
            },
            {
              title: 'Open Ski slopes km',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'openskislopeskm' },
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
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'totaltracks' },
            },
            {
              title: 'Open tracks',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'opentracks' },
            },
            {
              title: 'Total tracks km',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'totaltrackskm' },
            },
            {
              title: 'Open tracks km',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'opentrackskm' },
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
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'totalslides' },
            },
            {
              title: 'Open slides',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'opentslides' },
            },
            {
              title: 'Total slides km',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'totalslideskm' },
            },
            {
              title: 'Open slides km',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'openslidesskm' },
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
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'totaliceskating' },
            },
            {
              title: 'Open ice skating',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'openiceskating' },
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
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'Areaname' },
            },
          ],
        },
        {
          name: 'Address',
          properties: [
            {
              title: 'Street and House No',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'contactadress' },
            },
            {
              title: 'ZIP-Code',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'contactcap' },
            },
            {
              title: 'City',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'contactcity' },
            },
            {
              title: 'GPS North',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'contactgpsnorth' },
            },
            {
              title: 'GPS East',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'contactgpseast' },
            },
          ],
        },
        {
          name: 'Contact Details',
          properties: [
            {
              title: 'E-Mail',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'contactmail' },
            },
            {
              title: 'Phone Number',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'contacttel' },
            },
            {
              title: 'Web-URL',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'contactweburl' },
            },
          ],
        },
      ],
    },
  ],
};
