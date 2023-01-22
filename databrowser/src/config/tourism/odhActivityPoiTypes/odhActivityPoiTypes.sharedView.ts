import {
  DetailViewConfig,
  EditViewConfig,
} from '../../../domain/datasetConfig/types';
import { odhTypeDetailElement } from '../../builder/tourism';

export const odhActivityPoiTypesSharedView = ():
  | DetailViewConfig
  | EditViewConfig => ({
  elements: [odhTypeDetailElement()],
});
