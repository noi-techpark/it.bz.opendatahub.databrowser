import { SelectOption } from '../../../../../components/select/types';
import { FilterLanguage } from '../../../../datasets/language';

const supportedLanguages = Object.values(FilterLanguage);

export const getLanguageOptionsForFile = (language?: string) =>
  supportedLanguages.map<SelectOption>((supportedLanguage) => ({
    value: supportedLanguage,
    label: supportedLanguage,
    selected: supportedLanguage === language,
  }));
