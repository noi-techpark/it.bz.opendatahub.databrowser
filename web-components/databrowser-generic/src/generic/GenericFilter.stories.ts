// eslint-disable-next-line import/no-extraneous-dependencies
import { html, TemplateResult } from 'lit-html';
// eslint-disable-next-line import/no-extraneous-dependencies
import { OpenAPIV3 } from 'openapi-types';
import '../../databrowser-generic';

export default {
  title: 'GenericFilter',
  component: 'databrowser-generic-filter',
  argTypes: {
    parameters: { control: 'object' },
    filterChanges: { action: 'filterChanges' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  parameters?: OpenAPIV3.ParameterObject[];
  filterChanges?: () => void;
}

const Template: Story<ArgTypes> = ({
  parameters = [],
  filterChanges = () => {},
}: ArgTypes) => html`
  <databrowser-generic-filter
    .parameters="${parameters}"
    @filterChanges="${filterChanges}"
  ></databrowser-generic-filter>
`;

export const Regular = Template.bind({});
Regular.args = {
  parameters: [
    {
      name: 'pagenumber',
      in: 'query',
      description: 'Pagenumber',
      schema: {
        type: 'integer',
        format: 'int32',
        default: 1,
      },
    },
    {
      name: 'pagesize',
      in: 'query',
      description:
        'Elements per Page (If availabilitycheck set, pagesize has no effect all Accommodations are returned), (default:10)',
      schema: {
        type: 'integer',
      },
    },
    {
      name: 'seed',
      in: 'query',
      description:
        "Seed '1 - 10' for Random Sorting, '0' generates a Random Seed, 'null' disables Random Sorting, (default:null)",
      schema: {
        type: 'string',
      },
    },
    {
      name: 'categoryfilter',
      in: 'query',
      description:
        "Categoryfilter BITMASK values: 1 = (not categorized), 2 = (1star), 4 = (1flower), 8 = (1sun), 14 = (1star/1flower/1sun), 16 = (2stars), 32 = (2flowers), 64 = (2suns), 112 = (2stars/2flowers/2suns), 128 = (3stars), 256 = (3flowers), 512 = (3suns), 1024 = (3sstars), 1920 = (3stars/3flowers/3suns/3sstars), 2048 = (4stars), 4096 = (4flowers), 8192 = (4suns), 16384 = (4sstars), 30720 = (4stars/4flowers/4suns/4sstars), 32768 = (5stars), 65536 = (5flowers), 131072 = (5suns), 229376 = (5stars/5flowers/5suns), 'null' = (No Filter), (default:'null')",
      schema: {
        type: 'string',
      },
    },
    {
      name: 'typefilter',
      in: 'query',
      description:
        "Typefilter BITMASK values: 1 = (HotelPension), 2 = (BedBreakfast), 4 = (Farm), 8 = (Camping), 16 = (Youth), 32 = (Mountain), 64 = (Apartment), 128 = (Not defined),'null' = (No Filter), (default:'null')",
      schema: {
        type: 'string',
      },
    },
    {
      name: 'boardfilter',
      in: 'query',
      description:
        "Boardfilter BITMASK values: 0 = (all boards), 1 = (without board), 2 = (breakfast), 4 = (half board), 8 = (full board), 16 = (All inclusive), 'null' = (No Filter), (default:'null')",
      schema: {
        type: 'string',
      },
    },
    {
      name: 'featurefilter',
      in: 'query',
      description:
        "FeatureFilter BITMASK values: 1 = (Group-friendly), 2 = (Meeting rooms), 4 = (Swimming pool), 8 = (Sauna), 16 = (Garage), 32 = (Pick-up service), 64 = (WLAN), 128 = (Barrier-free), 256 = (Special menus for allergy sufferers), 512 = (Pets welcome), 'null' = (No Filter), (default:'null')",
      schema: {
        type: 'string',
      },
    },
    {
      name: 'featureidfilter',
      in: 'query',
      description:
        "Feature Id Filter, LIST filter over ALL Features available. Separator ',' List of Feature IDs, 'null' = (No Filter), (default:'null')",
      schema: {
        type: 'string',
      },
    },
    {
      name: 'themefilter',
      in: 'query',
      description:
        "Themefilter BITMASK values: 1 = (Gourmet), 2 = (At altitude), 4 = (Regional wellness offerings), 8 = (on the wheels), 16 = (With family), 32 = (Hiking), 64 = (In the vineyards), 128 = (Urban vibe), 256 = (At the ski resort), 512 = (Mediterranean), 1024 = (In the Dolomites), 2048 = (Alpine), 4096 = (Small and charming), 8192 = (Huts and mountain inns), 16384 = (Rural way of life), 32768 = (Balance), 65536 = (Christmas markets), 'null' = (No Filter), (default:'null')",
      schema: {
        type: 'string',
      },
    },
    {
      name: 'badgefilter',
      in: 'query',
      description:
        "BadgeFilter BITMASK values: 1 = (Belvita Wellness Hotel), 2 = (Familyhotel), 4 = (Bikehotel), 8 = (Red Rooster Farm), 16 = (Barrier free certificated), 32 = (Vitalpina Hiking Hotel), 64 = (Private Rooms in South Tyrol), 128 = (Vinum Hotels), 'null' = (No Filter), (default:'null')",
      schema: {
        type: 'string',
      },
    },
    {
      name: 'idfilter',
      in: 'query',
      description:
        "IDFilter LIST Separator ',' List of Accommodation IDs, 'null' = (No Filter), (default:'null')",
      schema: {
        type: 'string',
      },
    },
    {
      name: 'locfilter',
      in: 'query',
      description:
        "Locfilter SPECIAL Separator ',' possible values: reg + REGIONID = (Filter by Region), reg + REGIONID = (Filter by Region), tvs + TOURISMVEREINID = (Filter by Tourismverein), mun + MUNICIPALITYID = (Filter by Municipality), fra + FRACTIONID = (Filter by Fraction), 'null' = (No Filter), (default:'null') <a href=\"https://github.com/noi-techpark/odh-docs/wiki/Geosorting-and-Locationfilter-usage#location-filter-locfilter\" target=\"_blank\">Wiki locfilter</a>",
      schema: {
        type: 'string',
      },
    },
    {
      name: 'altitudefilter',
      in: 'query',
      description:
        "Altitude Range Filter SPECIAL (Separator ',' example Value: 500,1000 Altitude from 500 up to 1000 metres), (default:'null')",
      schema: {
        type: 'string',
      },
    },
    {
      name: 'odhtagfilter',
      in: 'query',
      description:
        "ODHTag Filter LIST (refers to Array SmgTags) (String, Separator ',' more ODHTags possible, 'null' = No Filter, available ODHTags reference to 'v1/ODHTag?validforentity=accommodation'), (default:'null')",
      schema: {
        type: 'string',
      },
    },
    {
      name: 'odhactive',
      in: 'query',
      description:
        "ODHActive Filter BOOLEAN (refers to field SmgActive) (possible Values: 'null' Displays all Accommodations, 'true' only ODH Active Accommodations, 'false' only ODH Disabled Accommodations), (default:'null')",
      schema: {
        type: 'boolean',
      },
    },
    {
      name: 'active',
      in: 'query',
      description:
        "TIC Active Filter BOOLEAN (possible Values: 'null' Displays all Accommodations, 'true' only TIC Active Accommodations, 'false' only TIC Disabled Accommodations), (default:'null')",
      schema: {
        type: 'boolean',
      },
    },
    {
      name: 'bookablefilter',
      in: 'query',
      schema: {
        type: 'boolean',
      },
    },
    {
      name: 'arrival',
      in: 'query',
      description:
        "Arrival DATE (yyyy-MM-dd) REQUIRED ON Availabilitycheck = true, (default:'Today's date')",
      schema: {
        type: 'string',
      },
    },
    {
      name: 'departure',
      in: 'query',
      description:
        "Departure DATE (yyyy-MM-dd) REQUIRED ON Availabilitycheck = true, (default:'Tomorrow's date')",
      schema: {
        type: 'string',
      },
    },
    {
      name: 'roominfo',
      in: 'query',
      description:
        "Roominfo Filter REQUIRED ON Availabilitycheck = true (Splitter for Rooms '|' Splitter for Persons Ages ',') (Room Types: 0=notprovided, 1=room, 2=apartment, 4=pitch/tent(onlyLTS), 8=dorm(onlyLTS)) possible Values Example 1-18,10|1-18 = 2 Rooms, Room 1 for 2 person Age 18 and Age 10, Room 2 for 1 Person Age 18), (default:'1-18,18')",
      schema: {
        type: 'string',
        default: '1-18,18',
      },
    },
    {
      name: 'bokfilter',
      in: 'query',
      description:
        "Booking Channels Filter REQUIRED ON Availabilitycheck = true (Separator ',' possible values: hgv = (Booking Südtirol), htl = (Hotel.de), exp = (Expedia), bok = (Booking.com), lts = (LTS Availability check)), (default:'hgv')",
      schema: {
        type: 'string',
        default: 'hgv',
      },
    },
    {
      name: 'source',
      in: 'query',
      description: "Source for MSS availability check, (default:'sinfo')",
      schema: {
        type: 'string',
        default: 'sinfo',
      },
    },
    {
      name: 'availabilitychecklanguage',
      in: 'query',
      description:
        "Language of the Availability Response (possible values: 'de','it','en')",
      schema: {
        type: 'string',
        default: 'en',
      },
    },
    {
      name: 'availabilitycheck',
      in: 'query',
      description:
        "Availability Check BOOLEAN (possible Values: 'true', 'false), (default Value: 'false') NOT AVAILABLE AS OPEN DATA, IF Availabilty Check is true certain filters are Required",
      schema: {
        type: 'boolean',
      },
    },
    {
      name: 'latitude',
      in: 'query',
      description:
        "GeoFilter FLOAT Latitude Format: '46.624975', 'null' = disabled, (default:'null') <a href=\"https://github.com/noi-techpark/odh-docs/wiki/Geosorting-and-Locationfilter-usage#geosorting-functionality\" target=\"_blank\">Wiki geosort</a>",
      schema: {
        type: 'string',
      },
    },
    {
      name: 'longitude',
      in: 'query',
      description:
        "GeoFilter FLOAT Longitude Format: '11.369909', 'null' = disabled, (default:'null') <a href=\"https://github.com/noi-techpark/odh-docs/wiki/Geosorting-and-Locationfilter-usage#geosorting-functionality\" target=\"_blank\">Wiki geosort</a>",
      schema: {
        type: 'string',
      },
    },
    {
      name: 'radius',
      in: 'query',
      description:
        'Radius INTEGER to Search in Meters. Only Object withhin the given point and radius are returned and sorted by distance. Random Sorting is disabled if the GeoFilter Informations are provided, (default:\'null\') <a href="https://github.com/noi-techpark/odh-docs/wiki/Geosorting-and-Locationfilter-usage#geosorting-functionality" target="_blank">Wiki geosort</a>',
      schema: {
        type: 'string',
      },
    },
    {
      name: 'language',
      in: 'query',
      description:
        "Language field selector, displays data and fields in the selected language, possible values: 'de|it|en|nl|cs|pl|fr|ru' only one language supported (default:'null' all languages are displayed)",
      schema: {
        type: 'string',
      },
    },
    {
      name: 'langfilter',
      in: 'query',
      description:
        "Language filter (returns only data available in the selected Language, Separator ',' possible values: 'de,it,en,nl,sc,pl,fr,ru', 'null': Filter disabled)",
      schema: {
        type: 'string',
      },
    },
    {
      name: 'updatefrom',
      in: 'query',
      description:
        "Returns data changed after this date Format (yyyy-MM-dd), (default: 'null')",
      schema: {
        type: 'string',
      },
    },
    {
      name: 'fields',
      in: 'query',
      description:
        'Select fields to display, More fields are indicated by separator \',\' example fields=Id,Active,Shortname (default:\'null\' all fields are displayed). <a href="https://github.com/noi-techpark/odh-docs/wiki/Common-parameters%2C-fields%2C-language%2C-searchfilter%2C-removenullvalues%2C-updatefrom#fields" target="_blank">Wiki fields</a>',
      schema: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
    },
    {
      name: 'searchfilter',
      in: 'query',
      description:
        'String to search for, Title in all languages are searched, (default: null) <a href="https://github.com/noi-techpark/odh-docs/wiki/Common-parameters%2C-fields%2C-language%2C-searchfilter%2C-removenullvalues%2C-updatefrom#searchfilter" target="_blank">Wiki searchfilter</a>',
      schema: {
        type: 'string',
      },
    },
    {
      name: 'rawfilter',
      in: 'query',
      description:
        '<a href="https://github.com/noi-techpark/odh-docs/wiki/Using-rawfilter-and-rawsort-on-the-Tourism-Api#rawfilter" target="_blank">Wiki rawfilter</a>',
      schema: {
        type: 'string',
      },
    },
    {
      name: 'rawsort',
      in: 'query',
      description:
        '<a href="https://github.com/noi-techpark/odh-docs/wiki/Using-rawfilter-and-rawsort-on-the-Tourism-Api#rawfilter" target="_blank">Wiki rawsort</a>',
      schema: {
        type: 'string',
      },
    },
    {
      name: 'removenullvalues',
      in: 'query',
      description:
        'Remove all Null values from json output. Useful for reducing json size. By default set to false. Documentation on <a href="https://github.com/noi-techpark/odh-docs/wiki/Common-parameters,-fields,-language,-searchfilter,-removenullvalues,-updatefrom#removenullvalues" target="_blank">Opendatahub Wiki</a>',
      schema: {
        type: 'boolean',
        default: false,
      },
    },
  ],
};
