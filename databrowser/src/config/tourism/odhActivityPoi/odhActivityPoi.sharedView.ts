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
  idReadOnlyCell,
  imageGalleryCategory,
  licenseInfoCategory,
  locationCategory,
  logoWithMainImageCells,
  odhTagCategory,
  seasonCategory,
  shortnameCell,
  sourceWithInsertsSubCategory,
  textInfoCategory,
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
              propertyMappings: {
                text: 'Detail.{language}.Title',
              },
            },
            ...logoWithMainImageCells(),
          ],
        },
        {
          name: 'IDs',
          properties: [idReadOnlyCell()],
        },
        dataStatesSubCategory(),
        sourceWithInsertsSubCategory([
          {
            position: 1,
            properties: [
              {
                title: 'Interface',
                component: CellComponent.StringCell,
                propertyMappings: { text: 'SyncSourceInterface' },
              },
              {
                title: 'Update mode',
                component: CellComponent.StringCell,
                propertyMappings: { text: 'SyncUpdateMode' },
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
              propertyMappings: { text: 'Ratings.Stamina' },
            },
            {
              title: 'Experience',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'Ratings.Experience' },
            },
            {
              title: 'Landscape',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'Ratings.Landscape' },
            },
            {
              title: 'Difficulty',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'Ratings.Difficulty' },
            },
            {
              title: 'Technique',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'Ratings.Technique' },
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
              propertyMappings: { text: 'AltitudeDifference' },
            },
            {
              title: 'Altitude Highest Point (m)',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'AltitudeHighestPoint' },
            },
            {
              title: 'Altitude Lowest Point (m)',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'AltitudeLowestPoint' },
            },
            {
              title: 'Altitude Sum Up (m)',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'AltitudeSumUp' },
            },
            {
              title: 'Altitude Sum Down (m)',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'AltitudeSumDown' },
            },
            {
              title: 'Length (m)',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'DistanceLength' },
            },
            {
              title: 'Duration (hh:mm)',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'DistanceDuration' },
            },
            {
              title: 'Number',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'Number' },
            },
            {
              title: 'Way Number',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'WayNumber' },
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
              propertyMappings: { enabled: 'Highlight' },
            },
            {
              title: 'Open',
              component: CellComponent.ToggleCell,
              propertyMappings: { enabled: 'IsOpen' },
            },
            {
              title: 'Free entrance',
              component: CellComponent.ToggleCell,
              propertyMappings: { enabled: 'HasFreeEntrance' },
            },
            {
              title: 'Prepared',
              component: CellComponent.ToggleCell,
              propertyMappings: { enabled: 'IsPrepared' },
            },
            {
              title: 'With Light',
              component: CellComponent.ToggleCell,
              propertyMappings: { enabled: 'IsWithLigth' },
            },
            {
              title: 'Has Rental',
              component: CellComponent.ToggleCell,
              propertyMappings: { enabled: 'HasRentals' },
            },
            {
              title: 'Run to Valley',
              component: CellComponent.ToggleCell,
              propertyMappings: { enabled: 'RunToValley' },
            },
            {
              title: 'Lift Available',
              component: CellComponent.ToggleCell,
              propertyMappings: { enabled: 'LiftAvailable' },
            },
            {
              title: 'Feet Climb',
              component: CellComponent.ToggleCell,
              propertyMappings: { enabled: 'FeetClimb' },
            },
            {
              title: 'Bike Transport',
              component: CellComponent.ToggleCell,
              propertyMappings: { enabled: 'BikeTransport' },
            },
          ],
        },
        {
          name: 'Target Group',
          properties: [
            {
              title: 'Age from',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'AgeFrom' },
            },
            {
              title: 'Age to',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'AgeTo' },
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
              propertyMappings: {
                enabled: 'AdditionalPoiInfos.{language}.Novelty',
              },
            },
          ],
        },
        {
          name: 'Additional Text',
          properties: [
            {
              title: 'Author Tip',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Detail.{language}.AuthorTip',
              },
            },
            {
              title: 'Parking Info',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'Detail.{language}.ParkingInfo' },
            },
            {
              title: 'Public Transportation Info',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Detail.{language}.PublicTransportationInfo',
              },
            },
            {
              title: 'Safety Info',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'Detail.{language}.SafetyInfo' },
            },
            {
              title: 'Equipment Info',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'Detail.{language}.EquipmentInfo' },
            },
          ],
        },
      ],
    },
    //webcamCategory(),
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
              propertyMappings: { text: 'OwnerRid' },
              class: 'break-all',
            },
            {
              title: 'Tourism organization Id',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'TourismorganizationId' },
            },
            {
              title: 'Outdoor Active ID',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'OutdooractiveID' },
            },
            {
              title: 'Outdoor Active Elevation ID',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'OutdooractiveElevationID' },
            },
            {
              title: 'Smg ID',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'SmgId' },
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
              propertyMappings: { text: 'CustomId' },
              class: 'break-all',
            },
            {
              title: 'Copyright Checked',
              component: CellComponent.ToggleCell,
              propertyMappings: { enabled: 'CopyrightChecked' },
              class: 'break-all',
            },
            {
              title: 'Main type / Type',
              component: CellComponent.InputReferenceCell,
              propertyMappings: { value: 'Type' },
              params: {
                url: withOdhBaseUrl('/v1/ODHActivityPoiTypes'),
                labelSelector: 'TypeDesc.{language}',
                keySelector: 'Key',
              },
            },
            {
              title: 'Sub Type',
              component: CellComponent.InputReferenceCell,
              propertyMappings: { value: 'SubType' },
              params: {
                url: withOdhBaseUrl('/v1/ODHActivityPoiTypes'),
                labelSelector: 'TypeDesc.{language}',
                keySelector: 'Key',
              },
            },
            {
              title: 'POI Type',
              component: CellComponent.InputReferenceCell,
              propertyMappings: { value: 'PoiType' },
              params: {
                url: withOdhBaseUrl('/v1/ODHActivityPoiTypes'),
                labelSelector: 'TypeDesc.{language}',
                keySelector: 'Key',
              },
            },
            {
              title: 'Difficulty',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'Difficulty' },
            },
            {
              title: 'Active on Open Data Hub',
              component: CellComponent.ToggleCell,
              propertyMappings: { enabled: 'SmgActive' },
            },
          ],
        },
        {
          name: 'Auto generated',
          properties: [
            {
              title: 'Categories',
              component: CellComponent.ArrayEditableCell,
              listFields: {
                attributeName: 'items',
                pathToParent: 'AdditionalPoiInfos.{language}.Categories',
              },
            },
          ],
        },
      ],
    },
  ],
});
