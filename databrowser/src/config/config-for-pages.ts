import { SupportedDomains } from '../domain/openApi/types';

export interface DatasetDescription {
  id: string;
  title: string;
  description: string;
  output: string;
  apiVersion: string;
  swaggerUrl: string;
  access: 'opendata' | 'limited' | 'closed';
  tableViewPathParam: string[];
  externalLink: string;
  sources: string[];
  lastUpdated?: Date;
}

export const datasetsForPages: Record<SupportedDomains, DatasetDescription[]> =
  {
    tourism: [
      {
        id: 'articles',
        title: 'Articles',
        description:
          'This dataset contains articles such as recipes, books, catalogues and guides. It contains Historical data. Only recipes are still updated.',
        output: 'JSON, mime-type application/json',
        apiVersion: 'v1',
        swaggerUrl:
          'http://tourism.opendatahub.bz.it/swagger/index.html#/Article',
        access: 'opendata',
        tableViewPathParam: ['Article'],
        externalLink: 'https://opendatahub.com/datasets/tourism/article/',
        sources: [
          'IDM Content data (data from 2010 to 2016, recipes still up-to-date) and NOI',
        ],
      },
      {
        id: 'district-and-municipalities',
        title: 'District & Municipalities',
        description:
          'In particular, these datasets contain Districts, Municipalities which are provided by LTS. And, in addition Areas are a LTS Categorization (custom LTS cluster). Areas, for example, are used on LTS Activities.',
        output: 'JSON, mime-type application/json',
        apiVersion: 'v1',
        swaggerUrl:
          'https://tourism.opendatahub.bz.it/swagger/index.html#/Common/get_v1_Municipality https://tourism.opendatahub.bz.it/swagger/index.html#/Common/get_v1_District',
        access: 'opendata',
        tableViewPathParam: ['Municipality'],
        externalLink:
          'https://opendatahub.com/datasets/tourism/locationandcommon_three/',
        sources: ['LTS'],
      },
      {
        id: 'events-noi-eurac',
        title: 'Events NOI & EURAC',
        description:
          'This dataset contains events provided by NOI Techpark and Eurac.',
        output: 'JSON, mime-type application/json',
        apiVersion: 'v1',
        swaggerUrl:
          'https://tourism.opendatahub.bz.it/swagger/index.html#/EventShort',
        access: 'opendata',
        tableViewPathParam: ['EventShort'],
        externalLink: 'https://opendatahub.com/datasets/tourism/eventshort/',
        sources: ['NOI Techpark', 'Eurac'],
      },
      {
        id: 'locations',
        title: 'Locations',
        description:
          'These datasets contain Location & Commons Data API of Tourism Regions. ID Lists of Regions, Tourism Associations, Areas, Municipalities, Ski Areas. Data provided by IDM.',
        output: 'JSON, mime-type application/json',
        apiVersion: 'v1',
        swaggerUrl:
          'http://tourism.opendatahub.bz.it/swagger/index.html#/Common http://tourism.opendatahub.bz.it/swagger/index.html#/Location',
        access: 'opendata',
        tableViewPathParam: ['Location'],
        externalLink:
          'https://opendatahub.com/datasets/tourism/locationandcommon_one/',
        sources: ['IDM'],
      },
      {
        id: 'snow-report',
        title: 'Snow Report',
        description:
          'Snow Report Data dataset contains detailed report of Ski Areas. Lifts, Slopes, Ski tracks, Sledges (status and conditions) data provided by LTS (daily updated), Measuring points (snow height, last snow day) data provided by LTS (daily updated), Ski Areas basic data provided by IDM.',
        output: 'JSON, mime-type application/json',
        apiVersion: 'v1',
        swaggerUrl:
          'https://tourism.opendatahub.bz.it/swagger/index.html#/Weather/get_v1_Weather_SnowReport',
        access: 'opendata',
        tableViewPathParam: ['Weather', 'SnowReport'],
        externalLink: 'https://opendatahub.com/datasets/tourism/snowreport/',
        sources: [
          'Snow data provided by LTS / Ski Areas basic data provided by IDM',
        ],
      },
      {
        id: 'tourism-regions',
        title: 'Tourism Regions',
        description:
          'In particular, these datasets contain Regions Data, Tourism Associations, Meta Regions, Ski Regions, Ski Areas, Experience Areas are the IDM clusters for South Tyrol Tourism Regions.',
        output: 'JSON, mime-type application/json',
        apiVersion: 'v1',
        swaggerUrl:
          'http://tourism.opendatahub.bz.it/swagger/index.html#/Common http://tourism.opendatahub.bz.it/swagger/index.html#/Location',
        access: 'opendata',
        tableViewPathParam: ['Region'],
        externalLink:
          'https://opendatahub.com/datasets/tourism/locationandcommon_two/',
        sources: ['IDM'],
      },
      {
        id: 'weather-forecast',
        title: 'Weather Forecast',
        description:
          'General Weather Information. Updated at 07:00 and 11:00. Weather Details for today, tomorrow, Mountain weather today, tomorrow, Station weather today, tomorrow and 5 days evolution. All data is requested live through the Weather service of the province BZ. Data available in languages de, it, en.',
        output: 'JSON, mime-type application/json',
        apiVersion: 'v1',
        swaggerUrl:
          'http://tourism.opendatahub.bz.it/swagger/index.html#/Weather',
        access: 'opendata',
        tableViewPathParam: ['Weather'],
        externalLink:
          'https://opendatahub.com/datasets/tourism/weatherforecast/',
        sources: ['SIAG'],
      },
      {
        id: 'accommodations',
        title: 'Accommodations',
        description:
          'This dataset contains accommodations. Accessible via REST or the AlpineBits HotelData open standard.',
        output: 'JSON, mime-type application/json, XML AlpineBits',
        apiVersion: 'v1',
        swaggerUrl:
          'https://tourism.opendatahub.bz.it/swagger/ui/index#/Accommodation',
        access: 'limited',
        tableViewPathParam: ['Accommodation'],
        externalLink:
          'https://opendatahub.com/datasets/tourism/accommodation_one/',
        sources: ['LTS'],
      },
      {
        id: 'activities',
        title: 'Activities',
        description:
          'This dataset contains data about activities from LTS API (LTS ActivityData), IDM and Dolomiti Superski such as local tours, hiking, running & fitness, cross-country skiing, alpine climbing, e-bike, downhill, nordic walking, etc. This dataset offers LTS categorization and enhanced filtering.',
        output: 'JSON, mime-type application/json',
        apiVersion: 'v1',
        swaggerUrl:
          'https://tourism.opendatahub.bz.it/swagger/index.html#/ODHActivityPoi/get_v1_ODHActivityPoi',
        access: 'limited',
        tableViewPathParam: ['Activity'],
        externalLink:
          'https://opendatahub.com/datasets/tourism/activitiesandpois_three/',
        sources: ['LTS ActivityData', 'IDM', 'Dolomiti Superski'],
      },
      {
        id: 'activities-pois-gastronomy',
        title: 'Activities, Pois & Gastronomy',
        description:
          'This dataset contains a collection of activities and points of interest (PoI) and gastronomy locations (such as restaurants, bars, alpine huts, etc.). The available data have been extracted from different sources such as SIAG South Tyrolean museums, Südtirol Wein, Dolomiti Superski, LTS, IDM created content.',
        output: 'JSON, mime-type application/json',
        apiVersion: 'v1',
        swaggerUrl:
          'http://tourism.opendatahub.bz.it/swagger/index.html#/ODHActivityPoi',
        access: 'limited',
        tableViewPathParam: ['ODHActivityPoi'],
        externalLink:
          'https://opendatahub.com/datasets/tourism/activitiesandpois_one/',
        sources: [
          'LTS ActivityData',
          'LTS PoiData',
          'LTS GastronomicData',
          'SuedtirolWein',
          'SIAG Museum data',
          'IDM Content and Dolomiti Superski',
        ],
      },
      {
        id: 'events',
        title: 'Events',
        description:
          'This dataset contains active events provided by LTS (TIC Web), DRIN and TreviLab such as meetings, fairs, markets, performances, courses, music, festivals, hikes, trips, guided tours, exhibitions, etc. It includes past events.',
        output: 'JSON, mime-type application/json',
        apiVersion: 'v1',
        swaggerUrl:
          'http://tourism.opendatahub.bz.it/swagger/index.html#/Event',
        access: 'limited',
        tableViewPathParam: ['Event'],
        externalLink: 'https://opendatahub.com/datasets/tourism/events/',
        sources: ['LTS', 'DRIN, TreviLab'],
      },
      {
        id: 'gastronomy',
        title: 'Gastronomy',
        description:
          'This dataset contains data about gastronomy locations from LTS API (LTS GastronomyData), SuedtirolWein and IDM such as restaurants, bars, bistros, pubs, apres ski, pizzerias, fast food, cafeterias, vinotheques, beer gardens, mountain refuges, alpine huts, ski huts, etc. This dataset offers enhance filtering (cuisine types, ceremony codes, dish codes etc.)',
        output: 'JSON, mime-type application/json',
        apiVersion: 'v1',
        swaggerUrl:
          'https://tourism.opendatahub.bz.it/swagger/index.html#/ODHActivityPoi/get_v1_ODHActivityPoi',
        access: 'limited',
        tableViewPathParam: ['Gastronomy'],
        externalLink:
          'https://opendatahub.com/datasets/tourism/activitiesandpois_four/',
        sources: ['IDM', 'SuedtirolWein', 'LTS'],
      },
      {
        id: 'points-of-interests',
        title: 'Points Of Interests',
        description:
          'This dataset contains data about PoIs from LTS API (LTS PoiData), such as beauty and wellness, bikes, castles, climbing halls, cocktail bars, e-bike rentals, fashion shops, pharmacies, gas stations, car parks, shops, ski schools, etc. This dataset offers LTS categorization.',
        output: 'JSON, mime-type application/json',
        apiVersion: 'v1',
        swaggerUrl:
          'https://tourism.opendatahub.bz.it/swagger/index.html#/ODHActivityPoi/get_v1_ODHActivityPoi',
        access: 'limited',
        tableViewPathParam: ['ODHActivityPoi'],
        externalLink:
          'https://opendatahub.com/datasets/tourism/activitiesandpois_two/',
        sources: ['LTS PoiData'],
      },
      {
        id: 'weather-measuring-points',
        title: 'Weather Measuring Points',
        description:
          'This dataset contains various Measuring Points with snow conditions provided by LTS.',
        output: 'JSON, mime-type application/json',
        apiVersion: 'v1',
        swaggerUrl:
          'https://tourism.opendatahub.bz.it/swagger/index.html#/Weather/get_v1_Weather_Measuringpoint',
        access: 'limited',
        tableViewPathParam: ['Weather', 'Measuringpoint'],
        externalLink:
          'https://opendatahub.com/datasets/tourism/weather_measuringpoint/',
        sources: ['LTS'],
      },
      {
        id: 'webcam',
        title: 'Webcam',
        description:
          'This dataset contains Webcam Data. All data is synchronized daily from LTS and IDM (Webcam links).',
        output: 'JSON, mime-type application/json',
        apiVersion: 'v1',
        swaggerUrl:
          'https://tourism.opendatahub.bz.it/swagger/index.html#/WebcamInfo',
        access: 'limited',
        tableViewPathParam: ['WebcamInfo'],
        externalLink: 'https://opendatahub.com/datasets/tourism/webcam/',
        sources: ['Webcam links from LTS and IDM'],
      },
      // The following needs POST request
      // {
      //   title: 'Accommodations Availability',
      //   description: 'The Accommodation Endpoint offers the possibility to make an Availability Request. It can be done through HGV MSS (Booking Suedtirol Endpoint) or LTS. The Availability Request returns offers with room pricing. Availability requests on both sources are closed data.',
      //   access: 'closed',
      //   tableViewPathParam: [''],
      //   externalLink: 'https://opendatahub.com/datasets/tourism/accommodation_three/',
      //   sources: [],
      // },
      // The following can not be called because it needs an accoid to work
      // {
      //   title: 'Accommodations Rooms',
      //   description: 'On the Accommodations Endpoint it is also possible to get Rooms.',
      //   access: 'closed',
      //   tableViewPathParam: [''],
      //   externalLink: 'https://opendatahub.com/datasets/tourism/accommodation_two/',
      //   sources: ['Data provided by LTS / Availability Requests provided by HGV/LTS'],
      // },
      {
        id: 'venue',
        title: 'Venue',
        description:
          'This dataset contains events location provided by LTS such as info about a location (e.g. number of seats, number of seats for disabled people, venue, etc.) or info to book an event location (e.g. prices, room configuration, etc.). Data are accessible in AlpineBits DestinationData format.',
        output: 'JSON, mime-type application/json',
        apiVersion: 'v1',
        swaggerUrl:
          'http://tourism.opendatahub.bz.it/swagger/index.html#/Venue',
        access: 'closed',
        tableViewPathParam: ['Venue'],
        externalLink: 'https://opendatahub.com/datasets/tourism/venue/',
        sources: ['LTS'],
      },
    ],
    mobility: [],
  };
