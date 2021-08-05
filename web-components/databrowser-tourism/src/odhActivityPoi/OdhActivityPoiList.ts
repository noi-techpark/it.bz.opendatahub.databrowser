import { html, LitElement, property } from 'lit-element';

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
  Detail: Record<
    string,
    {
      Title: string;
    }
  >;
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
 * This is the list view for API v1 ODHActivityPoi.
 */
export class OdhActivityPoiList extends LitElement {
  @property({ type: Object })
  data?: ODHActivityPoiJsonResult;

  private paginationChanges(url: string | null) {
    if (url == null) {
      return;
    }

    const paginationChanges: PaginationChanges = { url };

    const event = new CustomEvent('paginationChanges', {
      detail: paginationChanges,
    });

    this.dispatchEvent(event);
  }

  private detailRequested(url: string | null) {
    if (url == null) {
      return;
    }

    const detailRequested: DetailRequested = { url };

    const event = new CustomEvent('detailRequested', {
      detail: detailRequested,
    });

    this.dispatchEvent(event);
  }

  private renderResultHeader(data: ODHActivityPoiJsonResult) {
    return html`<ul>
      <li>TotalResults: ${data.TotalResults}</li>
      <li>TotalPages: ${data.TotalPages}</li>
      <li>CurrentPage: ${data.CurrentPage}</li>
    </ul>`;
  }

  private renderResultItem(item: ODHActivityPoi) {
    return html`<tr>
      <td>${item.Detail.en?.Title}</td>
      <td>${item.LocationInfo.RegionInfo.Name?.en}</td>
      <td>${item.HasLanguage != null ? item.HasLanguage.join(', ') : ''}</td>
      <td>${item.Source}</td>
      <td>${item.Active}</td>
      <td>
        <button @click="${() => this.detailRequested(item.Self)}">
          Load Detail
        </button>
      </td>
    </tr>`;
  }

  private renderResultBody(data: ODHActivityPoiJsonResult) {
    return html`<div>
      ${data.PreviousPage != null
        ? html`<button
            @click="${() => this.paginationChanges(data.PreviousPage)}"
          >
            Previous
          </button>`
        : null}
      ${data.NextPage != null
        ? html`<button @click="${() => this.paginationChanges(data.NextPage)}">
            Next
          </button>`
        : null}
    </div>`;
  }

  private renderResult(data: ODHActivityPoiJsonResult) {
    return html`
      <div>${this.renderResultHeader(data)}</div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Languages</th>
            <th>Source</th>
            <th>Active</th>
            <th>Details</th>
          </tr>
        </thead>
        ${data.Items.map(this.renderResultItem, this)}
      </table>
      <div>${this.renderResultBody(data)}</div>
    `;
  }

  render() {
    return html`${this.data != null &&
    Object.entries(this.data).length &&
    typeof this.data !== 'string'
      ? this.renderResult(this.data)
      : html`<span>No data</span>`} `;
  }
}
