// eslint-disable-next-line import/no-extraneous-dependencies
import { html, TemplateResult } from 'lit-html';
import '../../databrowser-generic';
import '../../databrowser-renderer';
import { ResourceConfig } from '../renderer/config.model';

export default {
  title: 'GenericResource',
  component: 'databrowser-generic-resource',
  argTypes: {
    data: { control: 'object' },
    config: { control: 'object' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  data?: Record<string, any> | null;
  config?: ResourceConfig | null;
}

const Template: Story<ArgTypes> = ({
  data = null,
  config = null,
}: ArgTypes) => html`
  <databrowser-generic-resource
    .data="${data}"
    .config="${config}"
  ></databrowser-generic-resource>
`;

export const Regular = Template.bind({});
Regular.args = {
  config: {
    props: [
      {
        field: 'Id',
        rendererTagName: 'databrowser-render-string',
        title: 'ID',
      },
      {
        field: 'Self',
        rendererTagName: 'databrowser-render-string',
        title: 'Self',
      },
    ],
  },
  data: {
    Id: '2657B7CBCB85380B253D2FBE28AF100E',
    Self: 'https://api.tourism.testingmachine.eu/v1/Accommodation/2657B7CBCB85380B253D2FBE28AF100E',
    HgvId: '12700',
    _Meta: {
      Id: '2657B7CBCB85380B253D2FBE28AF100E',
      Type: 'accommodation',
      Source: 'lts',
      LastUpdate: '2021-07-13T12:50:21.975372',
    },
    Active: true,
    Gpstype: 'position',
    HasRoom: true,
    ODHTags: [
      {
        Id: 'highlight architektur restaurant',
        Self: 'https://api.tourism.testingmachine.eu/v1/ODHTag/highlight%20architektur%20restaurant',
      },
      {
        Id: 'architektur historisch',
        Self: 'https://api.tourism.testingmachine.eu/v1/ODHTag/architektur%20historisch',
      },
      {
        Id: 'accomodation architektur',
        Self: 'https://api.tourism.testingmachine.eu/v1/ODHTag/accomodation%20architektur',
      },
    ],
    SmgTags: [
      'highlight architektur restaurant',
      'architektur historisch',
      'accomodation architektur',
    ],
    AccoType: {
      Id: 'BedBreakfast',
      Self: 'https://api.tourism.testingmachine.eu/v1/AccommodationTypes/BedBreakfast',
    },
    Altitude: 322.0,
    BadgeIds: [],
    BoardIds: ['breakfast'],
    Features: [
      {
        Id: 'C1A8A40E353346E98CF6FA81F769F690',
        Name: 'Continental breakfast/Brunch',
        Self: 'https://api.tourism.testingmachine.eu/v1/AccommodationFeatures/C1A8A40E353346E98CF6FA81F769F690',
        HgvId: '26',
        OtaCodes: null,
        RoomAmenityCodes: null,
      },
      {
        Id: 'BBD9085F89BC417B97D986A26CE86F40',
        Name: 'Credit card',
        Self: 'https://api.tourism.testingmachine.eu/v1/AccommodationFeatures/BBD9085F89BC417B97D986A26CE86F40',
        HgvId: '',
        OtaCodes: null,
        RoomAmenityCodes: null,
      },
      {
        Id: '9F05BA64D6614894A89FFE23A4A0F20B',
        Name: 'Bank card/Maestro',
        Self: 'https://api.tourism.testingmachine.eu/v1/AccommodationFeatures/9F05BA64D6614894A89FFE23A4A0F20B',
        HgvId: '',
        OtaCodes: null,
        RoomAmenityCodes: null,
      },
      {
        Id: '60F2408993E249F9A847F1B28C5B11E8',
        Name: 'Pick-up service',
        Self: 'https://api.tourism.testingmachine.eu/v1/AccommodationFeatures/60F2408993E249F9A847F1B28C5B11E8',
        HgvId: '30',
        OtaCodes: null,
        RoomAmenityCodes: null,
      },
      {
        Id: '93BDE34283FF41899CCF530BE80201E2',
        Name: 'Garden ',
        Self: 'https://api.tourism.testingmachine.eu/v1/AccommodationFeatures/93BDE34283FF41899CCF530BE80201E2',
        HgvId: '8',
        OtaCodes: null,
        RoomAmenityCodes: null,
      },
      {
        Id: 'F2B7D1125148460E85BFEC946517DF5B',
        Name: 'Library',
        Self: 'https://api.tourism.testingmachine.eu/v1/AccommodationFeatures/F2B7D1125148460E85BFEC946517DF5B',
        HgvId: '',
        OtaCodes: null,
        RoomAmenityCodes: null,
      },
      {
        Id: '4EE5A0766C2C4B4D8AA07A834E476E99',
        Name: 'Elevator',
        Self: 'https://api.tourism.testingmachine.eu/v1/AccommodationFeatures/4EE5A0766C2C4B4D8AA07A834E476E99',
        HgvId: '3',
        OtaCodes: null,
        RoomAmenityCodes: null,
      },
      {
        Id: '979FE8FAD1C74FB3BFD7E39161429EB9',
        Name: 'Public bar',
        Self: 'https://api.tourism.testingmachine.eu/v1/AccommodationFeatures/979FE8FAD1C74FB3BFD7E39161429EB9',
        HgvId: '39',
        OtaCodes: null,
        RoomAmenityCodes: null,
      },
      {
        Id: '9781B052B91E4F1785056FC9F26E79B8',
        Name: 'Restaurant',
        Self: 'https://api.tourism.testingmachine.eu/v1/AccommodationFeatures/9781B052B91E4F1785056FC9F26E79B8',
        HgvId: '',
        OtaCodes: null,
        RoomAmenityCodes: null,
      },
      {
        Id: '0CB41C05A6E04A019D08CE607985B382',
        Name: 'Open car park',
        Self: 'https://api.tourism.testingmachine.eu/v1/AccommodationFeatures/0CB41C05A6E04A019D08CE607985B382',
        HgvId: '2',
        OtaCodes: null,
        RoomAmenityCodes: null,
      },
      {
        Id: '700A920BE6D6426CBF3EC623C2E922C2',
        Name: 'WLAN',
        Self: 'https://api.tourism.testingmachine.eu/v1/AccommodationFeatures/700A920BE6D6426CBF3EC623C2E922C2',
        HgvId: '22',
        OtaCodes: null,
        RoomAmenityCodes: null,
      },
      {
        Id: '098EB30324EA492DBD99F323AE20A621',
        Name: 'Free Wi-Fi',
        Self: 'https://api.tourism.testingmachine.eu/v1/AccommodationFeatures/098EB30324EA492DBD99F323AE20A621',
        HgvId: '',
        OtaCodes: null,
        RoomAmenityCodes: null,
      },
      {
        Id: 'D9DCDD52FE444818AAFAB0E02FD92D91',
        Name: 'Dogs allowed',
        Self: 'https://api.tourism.testingmachine.eu/v1/AccommodationFeatures/D9DCDD52FE444818AAFAB0E02FD92D91',
        HgvId: '47',
        OtaCodes: null,
        RoomAmenityCodes: null,
      },
      {
        Id: 'BF108AD2B62042DF9FEAD4E865E11E75',
        Name: 'Bicycle rental',
        Self: 'https://api.tourism.testingmachine.eu/v1/AccommodationFeatures/BF108AD2B62042DF9FEAD4E865E11E75',
        HgvId: '54',
        OtaCodes: null,
        RoomAmenityCodes: null,
      },
    ],
    Latitude: 46.615101,
    ThemeIds: ['Wein', 'Mediterran'],
    IsCamping: false,
    Longitude: 11.143296,
    OdhActive: true,
    Shortname: '1477 Reichhalter',
    SmgActive: true,
    AccoBadges: [],
    AccoBoards: [
      {
        Id: 'breakfast',
        Self: 'https://api.tourism.testingmachine.eu/v1/AccommodationTypes/breakfast',
      },
    ],
    AccoDetail: {
      de: {
        Fax: '',
        Vat: '02200170211',
        Zip: '39011',
        City: 'Lana',
        Name: '1477 Reichhalter',
        Email: 'info@1477reichhalter.com',
        Phone: '+39 0473 051050',
        Mobile: '+39 335 7571631',
        Street: 'Metzgergasse 2',
        Website: 'http://www.1477reichhalter.com',
        Language: 'de',
        Lastname: 'Dissertori',
        Longdesc:
          'Seit über einem halben Jahrtausend: Dieses Haus hat laue und raue Winde geatmet, Sonnenstrahlen aufgesogen, vor nassem Nass und Schneegeflöck abgeschirmt, im Schatten von Wölkchen Menschengeschichten gespeichert. Beständig und zeitlos im Zentrum von Lana. Seit Sommer 2018 sind Klaus Dissertori und Familie sowie Martina und Andreas Heinisch mit Team für Sie da: Aufatmen und genießen im Café und Restaurant zu ebener Erde, rasten und abdrehen in einem der acht Zimmer in den oberen Stockwerken. Klar und verlässlich. Eben da.&#xD;&#xA;Inklusivleistungen: &#xD;&#xA;Frühstücken Sie mit uns von frühmorgens bis fast mittags. Wir achten auf Ihre speziellen Ernährungswünsche. Schwingen Sie sich kostenlos auf unsere Leih-Fahrräder. Für Sie WLAN im ganzen Haus. Lust auf ein gutes Buch in unserer Bibliothek? Im Golfclub Lana gibt’s für Sie Ermäßigung.&#xD;&#xA;Nutzen Sie die Angebote unseres Partnerhotels Schwarzschmied ganz in der Nähe: Wellness- und Spa-Bereich, Restaurant La Fucina, Yoga, Geführte Wanderungen, Fahrradverleih, Long Stay Parking&#xD;&#xA;',
        Firstname: 'Klaus',
        Shortdesc:
          'So simpel erklärt ist Reichhalter in Lana.\nSie trudeln ein, wir erzählen.\nSie hören den Bach rauschen,\nschwenken die Gabel,\ntanzen durchs Zimmer.\nWir rücken das Holztischchen zurecht, ziehen den Teig',
        CountryCode: 'IT',
        NameAddition: 'Klaus Dissertori',
      },
      en: {
        Fax: '',
        Vat: '02200170211',
        Zip: '39011',
        City: 'Lana',
        Name: '1477 Reichhalter',
        Email: 'info@1477reichhalter.com',
        Phone: '+39 0473 051050',
        Mobile: '+39 335 7571631',
        Street: 'Metzgergasse 2',
        Website: 'http://www.1477reichhalter.com',
        Language: 'en',
        Lastname: 'Dissertori',
        Longdesc:
          "The house has been breathing.&#xD;&#xA;For over half a century.&#xD;&#xA;Back then it was&#xD;&#xA;a butcher's, a mill, a bakery,&#xD;&#xA;a sawmill, a barn, a stable,&#xD;&#xA;a tavern, a coffee house.&#xD;&#xA;&#xD;&#xA;With eight rooms 1477 Reichhalter continues the history of the house up to the present and into the future. &#xD;&#xA;&#xD;&#xA;Martina and Andreas Heinisch open the doors to their café and restaurant. Travellers stop for a break, people step in and take a step back from their busy lives, souls get restored. Enjoy food and drink in good company, accurately chosen and carefully prepared.",
        Firstname: 'Klaus',
        Shortdesc:
          'So simple to explain is Reichhalter 1477 in Lana.\nYou turn up, we tell you stories.\nHear the brook flow, clink your fork, dance in your room.\nWe set the small wooden table, we pull the dough.',
        CountryCode: 'IT',
        NameAddition: 'Klaus Dissertori',
      },
      it: {
        Fax: '',
        Vat: '02200170211',
        Zip: '39011',
        City: 'Lana',
        Name: '1477 Reichhalter',
        Email: 'info@1477reichhalter.com',
        Phone: '+39 0473 051050',
        Mobile: '+39 335 7571631',
        Street: 'Via Macello 2',
        Website: 'http://www.1477reichhalter.com',
        Language: 'it',
        Lastname: 'Dissertori',
        Longdesc:
          "Da oltre mezzo millennio, questa casa &#xD;&#xA;respira venti balsamici, assorbe i raggi del sole, si lascia bagnare dall'acqua e dai fiocchi di neve. Custodendo all'ombra delle nuvole, le storie delle persone che la attraversano. Solida testimone del tempo, nel centro di Lana. Ad accogliervi, dalla primavera , Klaus Dissertori e la sua famiglia, insieme a Martina e Andreas Heinisch e al loro team: respirate profondamente e attardatevi nella caffetteria o nel ristorante al piano terra, rilassatevi in una delle otto camere ai piani superiori. Accoglienza e calore. Proprio qui.&#xD;&#xA;Servizi inclusi:&#xD;&#xA;La colazione con noi, si fa dal primo mattino fin quasi a mezzogiorno. Prestiamo attenzione alle vostre esigenze nutrizionali. Scoprite i dintorni, con le nostre bici a noleggio gratuito. Naturalmente, il Wi-Fi è in tutta la casa.&#xD;&#xA;Nella nostra biblioteca, troverete di più di un buon libro. Il Golf Club Lana vi offre uno sconto.&#xD;&#xA;Approfittate delle offerte del nostro hotel partner Schwarzschmied, distante solo pochi passi: Area benessere e Spa, Ristorante La Fucina, Yoga, Passeggiate guidate, Noleggio bici, Long Stay Parking&#xD;&#xA;&#xD;&#xA;&#xD;&#xA;",
        Firstname: 'Klaus',
        Shortdesc:
          'Così, semplicemente, Reichhalter  a Lana.\nVoi entrate, noi raccontiamo.\nSentite? Il torrente corre, la forchetta tintinna, nelle stanze, quasi una danza.',
        CountryCode: 'IT',
        NameAddition: 'Klaus Dissertori',
      },
    },
    AccoThemes: [
      {
        Id: 'Wein',
        Self: 'https://api.tourism.testingmachine.eu/v1/AccommodationTypes/Wein',
      },
      {
        Id: 'Mediterran',
        Self: 'https://api.tourism.testingmachine.eu/v1/AccommodationTypes/Mediterran',
      },
    ],
    AccoTypeId: 'BedBreakfast',
    DistrictId: '79CBD79551C911D18F1400A02427D15E',
    IsBookable: true,
    LastChange: '2021-07-13T12:50:21.975372',
    FirstImport: '2018-03-24T01:35:05.7368394',
    HasLanguage: ['de', 'it', 'en'],
    LicenseInfo: {
      Author: '',
      License: 'CC0',
      ClosedData: false,
      LicenseHolder: 'https://www.lts.it',
    },
    AccoCategory: {
      Id: '3suns',
      Self: 'https://api.tourism.testingmachine.eu/v1/AccommodationTypes/3suns',
    },
    AccoRoomInfo: [
      {
        Id: '30BA97D92CEDF6E641C0FF28D863E626',
        Self: 'https://api.tourism.testingmachine.eu/v1/AccommodationRoom/30BA97D92CEDF6E641C0FF28D863E626',
        Source: 'lts',
      },
      {
        Id: '60499E68A87A58354A4824A9B84699D7',
        Self: 'https://api.tourism.testingmachine.eu/v1/AccommodationRoom/60499E68A87A58354A4824A9B84699D7',
        Source: 'lts',
      },
      {
        Id: '7C2B1E3D0ADB4C0A525B1D1EFE7F1C61',
        Self: 'https://api.tourism.testingmachine.eu/v1/AccommodationRoom/7C2B1E3D0ADB4C0A525B1D1EFE7F1C61',
        Source: 'lts',
      },
      {
        Id: '9CCDC76F0A1F0D31B299C646C5368E71',
        Self: 'https://api.tourism.testingmachine.eu/v1/AccommodationRoom/9CCDC76F0A1F0D31B299C646C5368E71',
        Source: 'lts',
      },
      {
        Id: 'B438D3796647362FBFF88DBC10C0D3EA',
        Self: 'https://api.tourism.testingmachine.eu/v1/AccommodationRoom/B438D3796647362FBFF88DBC10C0D3EA',
        Source: 'lts',
      },
      {
        Id: 'D6461E9306DD9ED9EA2A683BF57C9F5D',
        Self: 'https://api.tourism.testingmachine.eu/v1/AccommodationRoom/D6461E9306DD9ED9EA2A683BF57C9F5D',
        Source: 'lts',
      },
      {
        Id: 'D777ECA497553B74F94A288795811258',
        Self: 'https://api.tourism.testingmachine.eu/v1/AccommodationRoom/D777ECA497553B74F94A288795811258',
        Source: 'lts',
      },
      {
        Id: 'DD8402D301C7F8D6579A724F8C2EEEC2',
        Self: 'https://api.tourism.testingmachine.eu/v1/AccommodationRoom/DD8402D301C7F8D6579A724F8C2EEEC2',
        Source: 'lts',
      },
    ],
    GastronomyId: 'GASTRO2657B7CBCB85380B253D2FBE28AF100E',
    HasApartment: false,
    ImageGallery: [],
    IsGastronomy: false,
    LocationInfo: {
      TvInfo: {
        Id: '522822B451CA11D18F1400A02427D15E',
        Name: {
          cs: 'Lana a okolí',
          de: 'Lana und Umgebung',
          en: 'Lana and environs',
          fr: 'Lana et environs',
          it: 'Lana e dintorni',
          nl: 'Lana en omgeving',
          pl: 'Lana i okolice',
          ru: 'Лана и окрестности',
        },
        Self: 'https://api.tourism.testingmachine.eu/v1/TourismAssociation/522822B451CA11D18F1400A02427D15E',
      },
      AreaInfo: null,
      RegionInfo: {
        Id: 'D2633A20C24E11D18F1B006097B8970B',
        Name: {
          cs: 'Meran/Merano a okolí',
          de: 'Meran und Umgebung',
          en: 'Meran/Merano and environs',
          fr: 'Meran/Merano et environs',
          it: 'Merano e dintorni',
          nl: 'Meran/Merano en omgeving',
          pl: 'Meran/Merano i okolice',
          ru: 'Меран/Merano и окрестности',
        },
        Self: 'https://api.tourism.testingmachine.eu/v1/Region/D2633A20C24E11D18F1B006097B8970B',
      },
      DistrictInfo: {
        Id: '79CBD79551C911D18F1400A02427D15E',
        Name: {
          cs: 'Lana/Lana',
          de: 'Lana',
          en: 'Lana/Lana',
          fr: 'Lana/Lana',
          it: 'Lana',
          nl: 'Lana/Lana',
          pl: 'Lana/Lana',
          ru: 'Лана',
        },
        Self: 'https://api.tourism.testingmachine.eu/v1/District/79CBD79551C911D18F1400A02427D15E',
      },
      MunicipalityInfo: {
        Id: '0EECEC93283E42488CBE0EB3B94CD339',
        Name: {
          cs: 'Lana',
          de: 'Lana',
          en: 'Lana',
          fr: 'Lana',
          it: 'Lana',
          nl: 'Lana',
          pl: 'Lana',
          ru: 'Лана',
        },
        Self: 'https://api.tourism.testingmachine.eu/v1/Municipality/0EECEC93283E42488CBE0EB3B94CD339',
      },
    },
    MainLanguage: 'DE',
    AccoCategoryId: '3suns',
    IndependentData: null,
    IsAccommodation: true,
    TourismVereinId: '522822B451CA11D18F1400A02427D15E',
    MssResponseShort: [],
    MarketingGroupIds: [
      '1341ACB6EBD1C1E211FC68FA68D93281',
      '285D559B2C8948738C58CB7C742559B3',
      '9E72B78AC5B14A9DB6BED6C2592483BF',
    ],
    AccoBookingChannel: [
      {
        Id: 'hgv',
        Pos1ID: '2',
        BookingId: '12700',
        Portalname: 'HGV Booking',
      },
    ],
    SpecialFeaturesIds: ['Abholservice', 'Wlan', 'Kleine Haustiere'],
    AccoSpecialFeatures: [
      {
        Id: 'Abholservice',
        Self: 'https://api.tourism.testingmachine.eu/v1/AccommodationTypes/Abholservice',
      },
      {
        Id: 'Wlan',
        Self: 'https://api.tourism.testingmachine.eu/v1/AccommodationTypes/Wlan',
      },
      {
        Id: 'Kleine Haustiere',
        Self: 'https://api.tourism.testingmachine.eu/v1/AccommodationTypes/Kleine%20Haustiere',
      },
    ],
    AltitudeUnitofMeasure: 'm',
  },
};
