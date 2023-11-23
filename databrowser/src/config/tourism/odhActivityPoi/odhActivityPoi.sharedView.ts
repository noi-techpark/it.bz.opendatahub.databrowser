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
  idAndCustomIdCells,
  imageGalleryCategory,
  licenseInfoCategory,
  locationCategory,
  logoWithMainImageCells,
  odhTagCategory,
  seasonCategory,
  shortnameCell,
  sourceWithInsertsSubCategory,
  textInfoCategory,
  webcamCategory,
} from '../../builder/tourism';
import { relatedcontentCategory } from '../../builder/tourism/relatedcontent';
import { withOdhBaseUrl } from '../../utils';

export const odhActivityPoiSharedView = ():
  | DetailViewConfig
  | EditViewConfig => ({
  elements: [
    {
      name: 'Main data',
      slug: 'main-data',
      subcategories: [
        {
          name: 'General data',
          properties: [
            shortnameCell(),
            {
              title: 'Title',
              component: CellComponent.StringCell,
              fields: {
                text: 'Detail.{language}.Title',
              },
            },
            ...logoWithMainImageCells(),
          ],
        },
        {
          name: 'IDs',
          properties: [...idAndCustomIdCells()],
        },
        dataStatesSubCategory(),
        sourceWithInsertsSubCategory([
          {
            position: 1,
            properties: [
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
        ]),
      ],
    },
    textInfoCategory(),
    contactCategory(),
    imageGalleryCategory(),
    seasonCategory(),
    locationCategory(),
    gpsDataCategory(),
    odhTagCategory('odhactivitypoi'),
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
      name: 'Details',
      slug: 'odhactivitypoi-details',
      subcategories: [
        {
          name: 'Characteristics',
          properties: [
            {
              title: 'Altitude difference (m)',
              component: CellComponent.StringCell,
              fields: { text: 'AltitudeDifference' },
            },
            {
              title: 'Altitude Highest Point (m)',
              component: CellComponent.StringCell,
              fields: { text: 'AltitudeHighestPoint' },
            },
            {
              title: 'Altitude Lowest Point (m)',
              component: CellComponent.StringCell,
              fields: { text: 'AltitudeLowestPoint' },
            },
            {
              title: 'Altitude Sum Up (m)',
              component: CellComponent.StringCell,
              fields: { text: 'AltitudeSumUp' },
            },
            {
              title: 'Altitude Sum Down (m)',
              component: CellComponent.StringCell,
              fields: { text: 'AltitudeSumDown' },
            },
            {
              title: 'Length (m)',
              component: CellComponent.StringCell,
              fields: { text: 'DistanceLength' },
            },
            {
              title: 'Duration (hh:mm)',
              component: CellComponent.StringCell,
              fields: { text: 'DistanceDuration' },
            },
            {
              title: 'Number',
              component: CellComponent.StringCell,
              fields: { text: 'Number' },
            },
            {
              title: 'Way Number',
              component: CellComponent.StringCell,
              fields: { text: 'WayNumber' },
            },
            {
              title: 'Exposition',
              component: CellComponent.ArrayEditableCell,
              listFields: {
                attributeName: 'items',
                pathToParent: 'Exposition',
              },
              required: false,
            },
          ],
        },
        {
          name: 'Properties',
          properties: [
            {
              title: 'Highlight',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'Highlight' },
            },
            {
              title: 'Open',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'IsOpen' },
            },
            {
              title: 'Free entrance',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'HasFreeEntrance' },
            },
            {
              title: 'Prepared',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'IsPrepared' },
            },
            {
              title: 'With Light',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'IsWithLigth' },
            },
            {
              title: 'Has Rental',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'HasRentals' },
            },
            {
              title: 'Run to Valley',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'RunToValley' },
            },
            {
              title: 'Lift Available',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'LiftAvailable' },
            },
            {
              title: 'Feet Climb',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'FeetClimb' },
            },
            {
              title: 'Bike Transport',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'BikeTransport' },
            },
          ],
        },
        {
          name: 'Target Group',
          properties: [
            {
              title: 'Age from',
              component: CellComponent.StringCell,
              fields: { text: 'AgeFrom' },
            },
            {
              title: 'Age to',
              component: CellComponent.StringCell,
              fields: { text: 'AgeTo' },
            },
          ],
        },
      ],
    },
    {
      name: 'Additional Information',
      slug: 'poi-additional',
      subcategories: [
        {
          name: 'General',
          properties: [
            {
              title: 'Novelty',
              component: CellComponent.TextAreaCell,
              fields: { enabled: 'AdditionalPoiInfos.{language}.Novelty' },
            },
            {
              title: 'Categories',
              component: CellComponent.ArrayEditableCell,
              listFields: {
                attributeName: 'items',
                pathToParent: 'AdditionalPoiInfos.{language}.Categories',
              },
              required: false,
            },
            // {
            //   title: 'Categories',
            //   component: CellComponent.InputReferenceCell,
            //   fields: { value: 'AdditionalPoiInfos.{language}.Categories' },
            //   params: {
            //     url: withOdhBaseUrl('/v1/ODHTag?displayascategory=true&mainentity=odhactivitypoi'),
            //     labelSelector: 'TagName.{language}',
            //     keySelector: 'Id',
            //   },
            // },
          ],
        },
        {
          name: 'Additional Text',
          properties: [
            {
              title: 'Author Tip',
              component: CellComponent.StringCell,
              fields: {
                text: 'Detail.{language}.AuthorTip',
              },
            },
            {
              title: 'Parking Info',
              component: CellComponent.StringCell,
              fields: { text: 'Detail.{language}.ParkingInfo' },
            },
            {
              title: 'Public Transportation Info',
              component: CellComponent.StringCell,
              fields: { text: 'Detail.{language}.PublicTransportationInfo' },
            },
            {
              title: 'Safety Info',
              component: CellComponent.StringCell,
              fields: { text: 'Detail.{language}.SafetyInfo' },
            },
            {
              title: 'Equipment Info',
              component: CellComponent.StringCell,
              fields: { text: 'Detail.{language}.EquipmentInfo' },
            },
          ],
        },
      ],
    },
    webcamCategory(),
    relatedcontentCategory(),
    licenseInfoCategory(),
    {
      name: 'Other',
      slug: 'other',
      subcategories: [
        {
          name: 'Various Ids',
          properties: [
            {
              title: 'Owner ID',
              component: CellComponent.StringCell,
              fields: { text: 'OwnerRid' },
              class: 'break-all',
            },
            {
              title: 'Tourism organization Id',
              component: CellComponent.StringCell,
              fields: { text: 'TourismorganizationId' },
            },
            {
              title: 'Outdoor Active ID',
              component: CellComponent.StringCell,
              fields: { text: 'OutdooractiveID' },
            },
            {
              title: 'Outdoor Active Elevation ID',
              component: CellComponent.StringCell,
              fields: { text: 'OutdooractiveElevationID' },
            },
            {
              title: 'Smg ID',
              component: CellComponent.StringCell,
              fields: { text: 'SmgId' },
            },
            {
              title: 'Area IDs',
              component: CellComponent.ArrayEditableCell,
              listFields: {
                attributeName: 'items',
                pathToParent: 'AreaId',
              },
              required: false,
            },
          ],
        },
        {
          name: 'Deprecated',
          properties: [
            {
              title: 'Custom Id',
              component: CellComponent.StringCell,
              fields: { text: 'CustomId' },
              class: 'break-all',
            },
            {
              title: 'Copyright Checked',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'CopyrightChecked' },
              class: 'break-all',
            },
            {
              title: 'Main type / Type',
              component: CellComponent.InputReferenceCell,
              fields: { value: 'Type' },
              params: {
                url: withOdhBaseUrl('/v1/ODHActivityPoiTypes'),
                labelSelector: 'TypeDesc.{language}',
                keySelector: 'Key',
              },
            },
            {
              title: 'Sub Type',
              component: CellComponent.InputReferenceCell,
              fields: { value: 'SubType' },
              params: {
                url: withOdhBaseUrl('/v1/ODHActivityPoiTypes'),
                labelSelector: 'TypeDesc.{language}',
                keySelector: 'Key',
              },
            },
            {
              title: 'POI Type',
              component: CellComponent.InputReferenceCell,
              fields: { value: 'PoiType' },
              params: {
                url: withOdhBaseUrl('/v1/ODHActivityPoiTypes'),
                labelSelector: 'TypeDesc.{language}',
                keySelector: 'Key',
              },
            },
            {
              title: 'Difficulty',
              component: CellComponent.StringCell,
              fields: { text: 'Difficulty' },
            },
            {
              title: 'Active on Open Data Hub',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'SmgActive' },
            },
          ],
        },
      ],
    },
  ],
});
