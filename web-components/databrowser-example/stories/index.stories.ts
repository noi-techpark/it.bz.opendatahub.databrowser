import { html, TemplateResult } from 'lit-html';
import '../databrowser-example';

export default {
  title: 'DatabrowserExample',
  component: 'databrowser-example',
  argTypes: {
    title: { control: 'text' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  title?: string;
  slot?: TemplateResult;
}

const Template: Story<ArgTypes> = ({
  title = 'Hello world',
  slot,
}: ArgTypes) => html`
  <databrowser-example .title=${title}> ${slot} </databrowser-example>
`;

export const Regular = Template.bind({});

export const CustomTitle = Template.bind({});
CustomTitle.args = {
  title: 'My title',
};

export const SlottedContent = Template.bind({});
SlottedContent.args = {
  slot: html`<p>Slotted content</p>`,
};
SlottedContent.argTypes = {
  slot: { table: { disable: true } },
};
