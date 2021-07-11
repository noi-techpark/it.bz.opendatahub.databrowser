import { html, fixture, expect } from '@open-wc/testing';

import { DatabrowserCounter } from './DatabrowserCounter';
import './databrowser-counter';

describe('DatabrowserLabel', () => {
  it('has a default title "Hey there" and counter 5', async () => {
    const el = await fixture<DatabrowserCounter>(
      html`<databrowser-counter></databrowser-counter>`
    );

    expect(el.title).to.equal('Hey there');
    expect(el.counter).to.equal(5);
  });

  it('increases the counter on button click', async () => {
    const el = await fixture<DatabrowserCounter>(
      html`<databrowser-counter></databrowser-counter>`
    );
    el.shadowRoot!.querySelector('button')!.click();

    expect(el.counter).to.equal(6);
  });

  it('can override the title via attribute', async () => {
    const el = await fixture<DatabrowserCounter>(
      html`<databrowser-counter title="attribute title"></databrowser-counter>`
    );

    expect(el.title).to.equal('attribute title');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<DatabrowserCounter>(
      html`<databrowser-counter></databrowser-counter>`
    );

    await expect(el).shadowDom.to.be.accessible();
  });
});
