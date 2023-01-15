import { computed } from 'vue';
import { RouteLocationRaw, useRouter } from 'vue-router';
import { DatasetPage } from '../../../routes';
import { ParameterValue, useApiQuery } from '../../api';

const buildPath = (
  name: string,
  language: ParameterValue | undefined,
  hash?: string
) => {
  return {
    name: name,
    query: { language },
    hash,
  };
};

export const usePaths = () => {
  const apiQuery = useApiQuery();
  const currentLanguage = apiQuery.useApiParameter('language');

  const router = useRouter();

  const detailViewPath = computed<RouteLocationRaw>(() =>
    buildPath(
      DatasetPage.DETAIL,
      currentLanguage.value,
      router.currentRoute.value.hash
    )
  );
  const quickViewPath = computed<RouteLocationRaw>(() =>
    buildPath(
      DatasetPage.QUICK,
      currentLanguage.value,
      router.currentRoute.value.hash
    )
  );
  const rawViewPath = computed<RouteLocationRaw>(() =>
    buildPath(
      DatasetPage.RAW,
      currentLanguage.value,
      router.currentRoute.value.hash
    )
  );
  const editViewPath = computed<RouteLocationRaw>(() =>
    buildPath(
      DatasetPage.EDIT,
      currentLanguage.value,
      router.currentRoute.value.hash
    )
  );
  const tableViewPath = computed<RouteLocationRaw>(() =>
    buildPath(DatasetPage.TABLE, currentLanguage.value)
  );
  const newViewPath = computed<RouteLocationRaw>(() =>
    buildPath(
      DatasetPage.NEW,
      currentLanguage.value,
      router.currentRoute.value.hash
    )
  );

  return {
    detailViewPath,
    quickViewPath,
    rawViewPath,
    editViewPath,
    tableViewPath,
    newViewPath,
  };
};
