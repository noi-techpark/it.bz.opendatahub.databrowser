import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { isViewConfig, useConfigProvider } from '../../viewConfig';

export const useDatasetHeroDescription = () => {
  const { t } = useI18n();

  const title = ref(t('header.hero.loading.title'));
  const subtitle = ref(t('header.hero.loading.subtitle'));
  const description = ref(t('header.hero.loading.description'));
  const isFinished = ref(false);

  const configProvider = useConfigProvider();

  watch(
    () => configProvider.currentViewConfig.value,
    (currentViewConfig) => {
      if (isViewConfig(currentViewConfig)) {
        title.value = currentViewConfig.description?.title ?? '';
        subtitle.value = currentViewConfig.description?.subtitle ?? '';
        description.value = currentViewConfig.description?.description ?? '';
      }
      isFinished.value = true;
    }
  );

  return {
    title,
    subtitle,
    description,
    isFinished,
  };
};
