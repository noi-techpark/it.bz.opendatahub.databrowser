import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { Router, useRouter } from 'vue-router';
import { useDatasetConfigStore } from '../../datasetConfig/store/datasetConfigStore';
import { DatasetConfig, DetailElements } from '../../datasetConfig/types';
import { Category } from '../category/types';

const handleSlug = (router: Router, elements: DetailElements[]) => {
  const initialSlug = elements[0]?.slug;

  // Compute set of allowed slugs from render config
  const configuredSlugs = elements.map((vc) => vc.slug);
  const allowedSlugs = new Set(configuredSlugs);

  // Slug = URL hash value (if present) without leading '#'
  const slug = router.currentRoute.value.hash?.substring(1);

  // Check if slug is string of length > 0 and that an according slug exists
  const isSlugValid = slug != null && slug.length > 0 && allowedSlugs.has(slug);

  // If slug is not valid, then remove it from URL and return initial slug
  if (!isSlugValid) {
    router.replace({
      hash: '',
      query: router.currentRoute.value.query,
    });

    return initialSlug;
  }

  // Return slug
  return slug;
};

export const useDetail = () => {
  const router = useRouter();

  const datasetConfigStore = useDatasetConfigStore();

  const slug = ref('');
  const subcategories = ref<DetailElements['subcategories']>([]);
  const categories = ref<Category[]>([]);
  const currentCategory = ref<Category | undefined>();

  const i18n = useI18n();

  watch(
    () => [datasetConfigStore.config, router.currentRoute.value],
    (watchedValues) => {
      const config = watchedValues[0] as DatasetConfig | undefined;

      if (datasetConfigStore.isDetailView || datasetConfigStore.isEditView) {
        const elements = datasetConfigStore.isDetailView
          ? config?.views?.detail?.elements!
          : config?.views?.edit?.elements!;

        // Handle slug
        slug.value = handleSlug(router, elements!);

        // Compute categories
        categories.value = elements.map((element) => {
          // If config is generated, use translated name.
          // Otherwise, use name as defined by config
          const name =
            datasetConfigStore.source === 'generated'
              ? i18n.t('datasets.generated.categoryName')
              : element.name;

          return {
            name,
            slug: element.slug,
            to: {
              hash: `#${element.slug}`,
              query: router.currentRoute.value.query,
            },
          };
        });

        // Compute subcategories
        subcategories.value =
          elements.find((config) => config.slug === slug.value)
            ?.subcategories ?? [];

        // Compute current category
        currentCategory.value = categories.value.find(
          (category) => slug.value === category.slug
        );
      } else {
        currentCategory.value = undefined;
      }
    },
    { immediate: true }
  );

  return {
    slug,
    subcategories,
    categories,
    currentCategory,
  };
};
