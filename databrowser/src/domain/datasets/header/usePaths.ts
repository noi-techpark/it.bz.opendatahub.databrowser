import { computed, Ref, unref } from 'vue';
import { RouteLocationNamedRaw, RouteLocationRaw, useRouter } from 'vue-router';
import { DatasetPage } from '../../../routes';
import { useApiQuery } from '../../api';
import { useMetaDataForCurrentRoute } from '../../metaDataConfig/tourism/useMetaData';

export const usePaths = () => {
  const datasetOverviewForId = (id: string | Ref<string>) =>
    computed<RouteLocationRaw>(() => ({
      name: 'OverviewDetailPage',
      params: { id: unref(id) },
    }));

  return {
    datasetOverviewForId,
  };
};

export const usePathsForCurrentRoute = () => {
  const { buildPath, buildPathForId } = initPathBuilder();

  const detailViewPath = computed<RouteLocationRaw>(() =>
    buildPath(DatasetPage.DETAIL)
  );
  const quickViewPath = computed<RouteLocationRaw>(() =>
    buildPath(DatasetPage.QUICK)
  );
  const rawViewPath = computed<RouteLocationRaw>(() =>
    buildPath(DatasetPage.RAW)
  );
  const editViewPath = computed<RouteLocationRaw>(() =>
    buildPath(DatasetPage.EDIT)
  );
  const tableViewPath = computed<RouteLocationRaw>(() =>
    buildPath(DatasetPage.TABLE, false)
  );
  const newViewPath = computed<RouteLocationRaw>(() =>
    buildPath(DatasetPage.NEW, false)
  );

  const detailViewPathForId = (id: string | Ref<string>) =>
    computed<RouteLocationRaw>(() =>
      buildPathForId(DatasetPage.DETAIL, unref(id))
    );
  const quickViewPathForId = (id: string | Ref<string>) =>
    computed<RouteLocationRaw>(() =>
      buildPathForId(DatasetPage.QUICK, unref(id))
    );
  const rawViewPathForId = (id: string | Ref<string>) =>
    computed<RouteLocationRaw>(() =>
      buildPathForId(DatasetPage.RAW, unref(id))
    );
  const editViewPathForId = (id: string | Ref<string>) =>
    computed<RouteLocationRaw>(() =>
      buildPathForId(DatasetPage.EDIT, unref(id))
    );
  const tableViewPathForId = (id: string | Ref<string>) =>
    computed<RouteLocationRaw>(() =>
      buildPathForId(DatasetPage.TABLE, unref(id), false)
    );
  const newViewPathForId = (id: string | Ref<string>) =>
    computed<RouteLocationRaw>(() =>
      buildPathForId(DatasetPage.NEW, unref(id), false)
    );

  return {
    detailViewPath,
    quickViewPath,
    rawViewPath,
    editViewPath,
    tableViewPath,
    newViewPath,
    detailViewPathForId,
    quickViewPathForId,
    rawViewPathForId,
    editViewPathForId,
    tableViewPathForId,
    newViewPathForId,
  };
};

const initPathBuilder = () => {
  const apiQuery = useApiQuery();
  const currentLanguage = apiQuery.useApiParameter('language');
  const { currentMetaData } = useMetaDataForCurrentRoute();
  const router = useRouter();

  const buildPath = (
    name: string,
    preserveHash: boolean = true
  ): RouteLocationNamedRaw => ({
    name: name,
    query: {
      ...currentMetaData.value?.apiFilter,
      language: currentLanguage.value,
    },
    hash: preserveHash ? router.currentRoute.value.hash : undefined,
  });

  const buildPathForId = (
    name: string,
    id: string,
    preserveHash: boolean = true
  ) => ({
    ...buildPath(name, preserveHash),
    params: { id },
  });

  return { buildPath, buildPathForId };
};
