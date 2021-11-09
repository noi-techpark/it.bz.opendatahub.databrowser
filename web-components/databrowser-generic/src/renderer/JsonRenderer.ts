import { html } from 'lit';
import { BaseRenderer } from './BaseRenderer';

/**
 * Render data as stringified JSON.
 */
export class JsonRenderer extends BaseRenderer {
  render() {
    return html`${this.data != null ? JSON.stringify(this.data) : null}`;
  }
}
