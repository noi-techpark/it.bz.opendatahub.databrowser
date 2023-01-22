import {
  DetailViewConfig,
  EditViewConfig,
} from '../../../domain/datasetConfig/types';
import { odhTypeDetailElement } from '../../builder/tourism';

export const accommodationTypesSharedView = ():
  | DetailViewConfig
  | EditViewConfig => ({
  elements: [odhTypeDetailElement()],
});
