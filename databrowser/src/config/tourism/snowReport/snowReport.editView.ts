import { EditViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';
import { ID_READONLY_CONFIG } from '../configBuilderCommonView';

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
              component: CellComponent.StringCell,
              fields: { text: 'Areaname' },
            },
            ID_READONLY_CONFIG,
            {
              title: 'RID',
              component: CellComponent.StringCell,
              fields: { text: 'RID' },
            },
            {
              title: 'Ski Region',
              component: CellComponent.StringCell,
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
              component: CellComponent.ImageEditCell,
              fields: { src: 'contactlogo' },
              params: { width: '200' },
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
              component: CellComponent.StringCell,
              fields: { text: 'Measuringpoints.0.Shortname' },
            },
            {
              title: 'Last Update',
              component: CellComponent.DateCell,
              fields: { date: 'Measuringpoints.0.LastUpdate' },
              params: { type: 'datetime' },
            },
            {
              title: 'Snow Height',
              component: CellComponent.StringCell,
              fields: { text: 'Measuringpoints.0.SnowHeight' },
            },
            {
              title: 'New Snow Height',
              component: CellComponent.StringCell,
              fields: { text: 'Measuringpoints.0.newSnowHeight' },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              fields: { text: 'Measuringpoints.0.Temperature' },
            },
            {
              title: 'Last Snow Date',
              component: CellComponent.DateCell,
              fields: { date: 'Measuringpoints.0.LastSnowDate' },
              params: {
                format: 'do MMMM yyyy HH:mm',
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
              component: CellComponent.StringCell,
              fields: { text: 'totalskilift' },
            },
            {
              title: 'Open Skilift',
              component: CellComponent.StringCell,
              fields: { text: 'openskilift' },
            },
            {
              title: 'Total Skilift km',
              component: CellComponent.StringCell,
              fields: { text: 'totalskiliftkm' },
            },
            {
              title: 'Open Skilift km',
              component: CellComponent.StringCell,
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
              component: CellComponent.StringCell,
              fields: { text: 'SkiAreaSlopeKm' },
            },
            {
              title: 'Total Ski slopes',
              component: CellComponent.StringCell,
              fields: { text: 'totalskislopes' },
            },
            {
              title: 'Open Ski slopes',
              component: CellComponent.StringCell,
              fields: { text: 'openskislopes' },
            },
            {
              title: 'Total Ski slopes km',
              component: CellComponent.StringCell,
              fields: { text: 'totalskislopeskm' },
            },
            {
              title: 'Open Ski slopes km',
              component: CellComponent.StringCell,
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
              component: CellComponent.StringCell,
              fields: { text: 'totaltracks' },
            },
            {
              title: 'Open tracks',
              component: CellComponent.StringCell,
              fields: { text: 'opentracks' },
            },
            {
              title: 'Total tracks km',
              component: CellComponent.StringCell,
              fields: { text: 'totaltrackskm' },
            },
            {
              title: 'Open tracks km',
              component: CellComponent.StringCell,
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
              component: CellComponent.StringCell,
              fields: { text: 'totalslides' },
            },
            {
              title: 'Open slides',
              component: CellComponent.StringCell,
              fields: { text: 'opentslides' },
            },
            {
              title: 'Total slides km',
              component: CellComponent.StringCell,
              fields: { text: 'totalslideskm' },
            },
            {
              title: 'Open slides km',
              component: CellComponent.StringCell,
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
              component: CellComponent.StringCell,
              fields: { text: 'totaliceskating' },
            },
            {
              title: 'Open ice skating',
              component: CellComponent.StringCell,
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
              component: CellComponent.StringCell,
              fields: { text: 'Areaname' },
            },
          ],
        },
        {
          name: 'Address',
          properties: [
            {
              title: 'Street and House No',
              component: CellComponent.StringCell,
              fields: { text: 'contactadress' },
            },
            {
              title: 'ZIP-Code',
              component: CellComponent.StringCell,
              fields: { text: 'contactcap' },
            },
            {
              title: 'City',
              component: CellComponent.StringCell,
              fields: { text: 'contactcity' },
            },
            {
              title: 'GPS North',
              component: CellComponent.StringCell,
              fields: { text: 'contactgpsnorth' },
            },
            {
              title: 'GPS East',
              component: CellComponent.StringCell,
              fields: { text: 'contactgpseast' },
            },
          ],
        },
        {
          name: 'Contact Details',
          properties: [
            {
              title: 'E-Mail',
              component: CellComponent.StringCell,
              fields: { text: 'contactmail' },
            },
            {
              title: 'Phone Number',
              component: CellComponent.StringCell,
              fields: { text: 'contacttel' },
            },
            {
              title: 'Web-URL',
              component: CellComponent.StringCell,
              fields: { text: 'contactweburl' },
            },
          ],
        },
      ],
    },
  ],
};
