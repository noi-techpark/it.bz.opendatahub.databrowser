import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export interface ODHActivityPoi {
  Id: string;
  Self: string;
  Type: string | null;
  Active: boolean;
  IsOpen: boolean;
  Source: string | null;
  GpsPoints: {
    position: {
      Gpstype: string | null;
      Altitude: number | null;
      Latitude: number;
      Longitude: number;
      AltitudeUnitofMeasure: string | null;
    };
  };
  HasLanguage: string[];
  ContactInfos: Record<
    string,
    {
      CompanyName: string | null;
    }
  >;
  LocationInfo: {
    RegionInfo: {
      Id: string | null;
      Name: Record<string, string> | null;
      Self: string;
    };
    DistrictInfo: {
      Id: string | null;
      Name: Record<string, string> | null;
      Self: string;
    };
    MunicipalityInfo: {
      Id: string | null;
      Name: Record<string, string> | null;
      Self: string;
    };
  };
}

export interface ODHActivityPoiJsonResult {
  TotalResults: number;
  TotalPages: number;
  CurrentPage: number;
  PreviousPage: string | null;
  NextPage: string | null;
  Seed: string | null;
  Items: ODHActivityPoi[];
}

export interface PaginationChanges {
  url: string;
}

export interface DetailRequested {
  url: string;
}

/**
 * This is the detail view for API v1 ODHActivityPoi.
 */
export class OdhActivityPoiDetail extends LitElement {
  @property({ type: Object })
  data?: any;

  render() {
    return html`${JSON.stringify(this.data)}`;
  }
}
