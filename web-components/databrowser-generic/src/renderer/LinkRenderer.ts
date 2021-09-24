import { html } from 'lit';
import { property } from 'lit/decorators';
import { BaseRenderer } from './BaseRenderer';

/**
 * Render data as link.
 */
export class LinkRenderer extends BaseRenderer {
  @property()
  data?: {
    alt?: string;
    href?: string;
    text?: string;
  };

  render() {
    return html`<a href="${this.data?.href}" alt="${this.data?.alt}"
      >${this.data?.text} ( )</a
    >`;
  }
}
