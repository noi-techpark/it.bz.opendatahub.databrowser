import { html } from 'lit';
import { BaseRenderer } from './BaseRenderer';

/**
 * Render data as string.
 */
export class StringRenderer extends BaseRenderer {
  render() {
    return html`${this.data}`;
  }
}
