import { CellComponent } from '../../../domain/cellComponents/types';
import {
  PropertyConfig,
  SubCategoryElement,
} from '../../../domain/datasetConfig/types';
import { lastChangesCell } from './lastChanges';

interface Options {
  hasLastChanges?: boolean;
  hasVisibleInSearch?: boolean;
}

export const dataStatesSubCategory = (
  options?: Options
): SubCategoryElement => {
  const dataStates = {
    name: 'Data states',
    properties: [
      lastChangesCell(),
      {
        title: 'Active on Source',
        component: CellComponent.ToggleCell,
        fields: { enabled: 'Active' },
      },
      {
        title: 'Active on Open Data Hub',
        component: CellComponent.ToggleCell,
        fields: { enabled: 'OdhActive' },
      },
      {
        title: 'Active on SMG',
        component: CellComponent.ToggleCell,
        fields: { enabled: 'SmgActive' },
      },
    ],
  };

  if (options?.hasVisibleInSearch) {
    dataStates.properties.push({
      title: 'Visible in Search',
      component: CellComponent.ToggleCell,
      fields: { enabled: 'VisibleInSearch' },
    });
  }

  return dataStates;
};

export const dataStatesWithInsertsSubCategory = (
  inserts: { position: number; properties: PropertyConfig[] }[],
  options?: Options
): SubCategoryElement => {
  const dataStates = dataStatesSubCategory(options);
  inserts.forEach((insert) => {
    dataStates.properties.splice(insert.position, 0, ...insert.properties);
  });
  return dataStates;
};
