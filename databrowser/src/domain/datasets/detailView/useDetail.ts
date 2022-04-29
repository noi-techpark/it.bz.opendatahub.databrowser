import { Ref, ref, watch } from 'vue';
import { Router, useRouter } from 'vue-router';
import {
  DetailElements,
  DetailRenderConfig,
  ViewConfig,
} from '../../viewConfig/types';
import { DetailCategory } from './types';

const handleSlug = (router: Router, renderConfig: DetailRenderConfig) => {
  const initialSlug = renderConfig.elements[0]?.slug;

  // Compute set of allowed slugs from render config
  const configuredSlugs = renderConfig.elements.map((vc) => vc.slug);
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

export const useDetail = (viewConfig: Ref<ViewConfig>) => {
  const router = useRouter();

  const slug = ref('');
  const subcategories = ref<DetailElements['subcategories']>([]);
  const categories = ref<DetailCategory[]>([]);

  watch(
    () => viewConfig.value,
    (vc) => {
      const { renderConfig } = vc;

      if (renderConfig.type === 'detail') {
        // Handle slug
        slug.value = handleSlug(router, renderConfig);

        // Compute categories
        categories.value = renderConfig.elements.map((element) => {
          return {
            name: element.name,
            slug: element.slug,
            to: {
              hash: `#${element.slug}`,
              query: router.currentRoute.value.query,
            },
          };
        });

        // Compute subcategories
        subcategories.value =
          renderConfig.elements.find((config) => config.slug === slug.value)
            ?.subcategories ?? [];
      }
    },
    { immediate: true }
  );

  return {
    slug,
    subcategories,
    categories,
  };
};
