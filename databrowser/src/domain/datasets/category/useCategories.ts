import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { Router, useRouter } from 'vue-router';
import { useDatasetConfigStore } from '../../datasetConfig/store/datasetConfigStore';
import { DatasetConfig, DetailElements } from '../../datasetConfig/types';
import { Category, SubCategory } from './types';

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

const hasAnyRequiredField = (element: DetailElements) =>
  element.subcategories.some((sub) =>
    sub.properties.some((prop) => prop.required === true)
  );

export const useCategories = () => {
  const router = useRouter();
  const datasetConfigStore = useDatasetConfigStore();
  const i18n = useI18n();

  const categories = ref<Category[]>([]);
  const subcategories = ref<SubCategory[]>([]);
  const slug = ref('');
  const currentCategory = ref<Category | undefined>();

  watch(
    () => [datasetConfigStore.config, router.currentRoute.value],
    (watchedValues) => {
      const config = watchedValues[0] as DatasetConfig | undefined;

      if (!datasetConfigStore.isDetailView && !datasetConfigStore.isEditView) {
        slug.value = '';
        currentCategory.value = undefined;
        return;
      }

      const views = config?.views;
      const elements = datasetConfigStore.isDetailView
        ? views?.detail?.elements!
        : views?.edit?.elements!;

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

        const isAnyFieldRequired = hasAnyRequiredField(element);

        return {
          name,
          slug: element.slug,
          to: {
            hash: `#${element.slug}`,
            query: router.currentRoute.value.query,
          },
          subCategories: element.subcategories,
          isAnyFieldRequired,
        };
      });

      // Compute subcategories
      subcategories.value =
        elements.find((config) => config.slug === slug.value)?.subcategories ??
        [];

      // Compute current category
      currentCategory.value = categories.value.find(
        (category) => slug.value === category.slug
      );
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
