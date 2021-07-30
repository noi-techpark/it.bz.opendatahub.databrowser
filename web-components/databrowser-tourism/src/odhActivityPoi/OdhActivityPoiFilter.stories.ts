import { html, TemplateResult } from 'lit-html';
import '../../databrowser-odhActivityPoi';

export default {
  title: 'OdhActivityPoiFilter',
  component: 'databrowser-odh-activity-poi-filter',
  argTypes: {
    type: { control: 'text' },
    active: { type: 'select', options: ['null', 'true', 'false'] },
    filterChanges: { action: 'filterChanges' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  type?: string;
  active?: string | null;
  filterChanges?: () => void;
}

const Template: Story<ArgTypes> = ({
  type = '63',
  active = null,
  filterChanges = () => {},
}: ArgTypes) => html`
  <databrowser-odh-activity-poi-filter
    .type="${type}"
    .active="${active}"
    @filterChanges="${filterChanges}"
  ></databrowser-odh-activity-poi-filter>
`;

export const Regular = Template.bind({});
Regular.args = {
  type: '63',
  active: null,
};
