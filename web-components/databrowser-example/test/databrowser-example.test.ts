import { html, fixture, expect } from '@open-wc/testing';

import { DatabrowserExample } from '../src/DatabrowserExample.js';
import '../databrowser-example.js';

describe('DatabrowserExample', () => {
  it('has a default title "This is the databrowser-example Web Component', async () => {
    const el = await fixture<DatabrowserExample>(
      html`<databrowser-example></databrowser-example>`
    );

    expect(el.title).to.equal('This is the databrowser-example Web Component');
  });

  it('can override the title via attribute', async () => {
    const el = await fixture<DatabrowserExample>(
      html`<databrowser-example title="attribute title"></databrowser-example>`
    );

    expect(el.title).to.equal('attribute title');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<DatabrowserExample>(
      html`<databrowser-example></databrowser-example>`
    );

    await expect(el).shadowDom.to.be.accessible();
  });
});
