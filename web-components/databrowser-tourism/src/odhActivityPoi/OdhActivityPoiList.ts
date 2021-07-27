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
  list?: ODHActivityPoiJsonResult;

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

  private renderResultHeader(list: ODHActivityPoiJsonResult) {
    return html`<ul>
      <li>TotalResults: ${list.TotalResults}</li>
      <li>TotalPages: ${list.TotalPages}</li>
      <li>CurrentPage: ${list.CurrentPage}</li>
    </ul>`;
  }

  private renderResultItem(item: ODHActivityPoi) {
    return html`<tr>
      <td>${item.ContactInfos.en?.CompanyName}</td>
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

  private renderResultBody(list: ODHActivityPoiJsonResult) {
    return html`<div>
      ${list.PreviousPage != null
        ? html`<button
            @click="${() => this.paginationChanges(list.PreviousPage)}"
          >
            Previous
          </button>`
        : null}
      ${list.NextPage != null
        ? html`<button @click="${() => this.paginationChanges(list.NextPage)}">
            Next
          </button>`
        : null}
    </div>`;
  }

  private renderResult(list: ODHActivityPoiJsonResult) {
    return html`
      <div>${this.renderResultHeader(list)}</div>
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
        ${list.Items.map(this.renderResultItem, this)}
      </table>
      <div>${this.renderResultBody(list)}</div>
    `;
  }

  render() {
    return html`${this.list != null &&
    Object.entries(this.list).length &&
    typeof this.list !== 'string'
      ? this.renderResult(this.list)
      : html`<span>No data</span>`} `;
  }
}
