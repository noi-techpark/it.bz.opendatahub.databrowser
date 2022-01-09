import { reactive, ref, toRefs, watch } from 'vue';
import { useRouter } from 'vue-router';

export const useHashSlug = (initialSlug: string, allowedSlugs: Set<string>) => {
  const router = useRouter();

  const currentSlug = ref(initialSlug);

  watch(
    () => router.currentRoute.value,
    (route) => {
      // Return URL hash value (if present) without leading '#'
      const hash = route.hash?.substring(1);

      // Check if hash is string of length > 0 and that an according slug exists
      const isHashValid =
        hash != null && hash.length > 0 && allowedSlugs.has(hash);

      currentSlug.value = isHashValid ? hash : initialSlug;

      // Remove invalid slug from URL
      if (!isHashValid) {
        router.replace({
          hash: '',
        });
      }
    },
    { immediate: true }
  );

  return toRefs(reactive({ currentSlug }));
};
