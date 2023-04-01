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
  locationCategory,
  logoCell,
  municipalityIdCell,
  odhTagCategory,
  regionIdCell,
  seasonCategory,
  shortnameCell,
  sourceWithInsertsSubCategory,
  textInfoCategory,
  webcamCell,
} from '../../builder/tourism';
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
            {
              title: 'Title',
              component: CellComponent.StringCell,
              fields: {
                text: 'Detail.{language}.Title',
              },
            },
            shortnameCell(),
            logoCell(),
            {
              title: 'Type',
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
              title: 'Poi Type',
              component: CellComponent.InputReferenceCell,
              fields: { value: 'PoiType' },
              params: {
                url: withOdhBaseUrl('/v1/ODHActivityPoiTypes'),
                labelSelector: 'TypeDesc.{language}',
                keySelector: 'Key',
              },
            },
            {
              title: 'Novelty',
              component: CellComponent.ToggleCell,
              fields: {
                text: 'AdditionalPoiInfos.{language}.Novelty',
              },
            },
          ],
        },
        {
          name: 'IDs',
          properties: [
            ...idAndCustomIdCells(),
            {
              title: 'Owner ID',
              component: CellComponent.StringCell,
              fields: { text: 'OwnerRid' },
              class: 'break-all',
            },
            regionIdCell('LocationInfo.RegionInfo.Id'),
            {
              title: 'Area ID',
              component: CellComponent.StringCell,
              fields: { text: 'LocationInfo.AreaInfo.Id' },
              class: 'break-all',
            },
            municipalityIdCell('LocationInfo.MunicipalityInfo.Id'),
            {
              title: 'District ID',
              component: CellComponent.StringCell,
              fields: { text: 'LocationInfo.DistrictInfo.Id' },
              class: 'break-all',
            },
            {
              title: 'District RID',
              component: CellComponent.StringCell,
              fields: { text: 'OwnerRid' },
              class: 'break-all',
            },

            {
              title: 'Outdoor Active ID',
              component: CellComponent.StringCell,
              fields: { text: 'OutdooractiveID' },
            },
          ],
        },
        {
          name: 'Additional Information',
          properties: [
            {
              title: 'Highlight',
              component: CellComponent.ToggleCell,
              fields: { text: 'Highlight' },
            },
            {
              title: 'Open',
              component: CellComponent.ToggleCell,
              fields: { text: 'IsOpen' },
            },
            {
              title: 'Free Entrance',
              component: CellComponent.ToggleCell,
              fields: { text: 'HasFreeEntrance' },
            },
            {
              title: 'Prepared',
              component: CellComponent.ToggleCell,
              fields: { text: 'IsPrepared' },
            },
            {
              title: 'With Light',
              component: CellComponent.ToggleCell,
              fields: { text: 'IsWithLigth' },
            },
            {
              title: 'Has Rentals',
              component: CellComponent.ToggleCell,
              fields: { text: 'HasRentals' },
            },
            {
              title: 'Runs To Valley',
              component: CellComponent.ToggleCell,
              fields: { text: 'RunToValley' },
            },
            {
              title: 'Lift Available',
              component: CellComponent.ToggleCell,
              fields: { text: 'LiftAvailable' },
            },
            {
              title: 'Feet Climb',
              component: CellComponent.ToggleCell,
              fields: { text: 'FeetClimb' },
            },
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
              fields: { text: 'ParkingInfo' },
            },
            {
              title: 'Public Transportation Info',
              component: CellComponent.StringCell,
              fields: { text: 'PublicTransportationInfo' },
            },
            {
              title: 'Safety Info',
              component: CellComponent.StringCell,
              fields: { text: 'SafetyInfo' },
            },
            {
              title: 'Equipment Info',
              component: CellComponent.StringCell,
              fields: { text: 'EquipmentInfo' },
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
        {
          name: 'Other',
          properties: [
            {
              title: 'Tourism organization Id',
              component: CellComponent.StringCell,
              fields: { text: 'TourismorganizationId' },
            },
            {
              title: 'District',
              component: CellComponent.StringCell,
              fields: { text: 'DistrictInfo.Name.de' },
            },
          ],
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
    {
      name: 'Related content',
      slug: 'related-content',
      subcategories: [
        {
          name: 'Related data',
          properties: [
            {
              title: 'Activity',
              component: CellComponent.StringCell,
              fields: { text: 'RelatedContent' },
            },
            {
              title: 'Gastronomy',
              component: CellComponent.StringCell,
              fields: { text: 'RelatedContent' },
            },
            {
              title: 'Event',
              component: CellComponent.StringCell,
              fields: { text: 'RelatedContent' },
            },
          ],
        },
      ],
    },
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
      name: 'Activity Details',
      slug: 'activity-details',
      subcategories: [
        {
          name: 'Characteristics',
          properties: [
            {
              title: 'Difficulty',
              component: CellComponent.StringCell,
              fields: { text: 'Ratings.Difficulty' },
            },
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
              title: 'Exposition (hh:mm)',
              component: CellComponent.StringCell,
              fields: { text: 'Exposition' },
            },
          ],
        },
        {
          name: 'Additional information',
          properties: [
            {
              title: 'Highlight',
              component: CellComponent.ToggleCell,
              fields: { text: 'Highlight' },
            },
            {
              title: 'Open',
              component: CellComponent.ToggleCell,
              fields: { text: 'IsOpen' },
            },
            {
              title: 'Free entrance',
              component: CellComponent.ToggleCell,
              fields: { text: 'HasFreeEntrance' },
            },
            {
              title: 'Prepared',
              component: CellComponent.ToggleCell,
              fields: { text: 'IsPrepared' },
            },
            {
              title: 'With Light',
              component: CellComponent.ToggleCell,
              fields: { text: 'IsWithLigth' },
            },
            {
              title: 'Has Rental',
              component: CellComponent.ToggleCell,
              fields: { text: 'HasRentals' },
            },
            {
              title: 'Run to Valley',
              component: CellComponent.ToggleCell,
              fields: { text: 'RunToValley' },
            },
            {
              title: 'Lift Available',
              component: CellComponent.ToggleCell,
              fields: { text: 'LiftAvailable' },
            },
            {
              title: 'Feet Climb',
              component: CellComponent.ToggleCell,
              fields: { text: 'FeetClimb' },
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
      name: 'POI Details',
      slug: 'poi-details',
      subcategories: [
        {
          name: 'General',
          properties: [
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
              title: 'Novelty',
              component: CellComponent.ToggleCell,
              fields: { text: 'AdditionalPoiInfos.{language}.Novelty' },
            },
          ],
        },
      ],
    },
    {
      name: 'Webcam Details',
      slug: 'webcam-details',
      subcategories: [
        {
          name: '',
          properties: [webcamCell()],
        },
      ],
    },
  ],
});
