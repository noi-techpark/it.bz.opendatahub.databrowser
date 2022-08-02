import { AxiosError } from 'axios';
import { computed, ref, Ref, watch } from 'vue';
import { Category, SubCategory } from '../category/types';

export const useApplyError = (
  categories: Ref<Category[]>,
  subcategories: Ref<SubCategory[]>,
  mutateError: Ref<any>
) => {
  const responseErrors = computed(() => {
    const err = mutateError.value;

    if (err == null) {
      return null;
    }

    if (err instanceof AxiosError) {
      const responseData = err.response?.data;

      // For some cases (e.g. error during POST to create a new record),
      // there is no error object and the error message is just send as
      // plain text. That case must be handled
      if (typeof responseData === 'string') {
        return {
          title: responseData,
        };
      }

      // The Open Data Hub error object values can be either of type string or string[].
      // The string type values contain information like HTTP status code. Only the string[]
      // type fields contain true error messages. Those need to be returned

      const responseErrors = responseData.errors as Record<
        string,
        string | string[]
      >;
      const errors = Object.entries(responseErrors).reduce<
        Record<string, string[]>
      >((previous, [key, value]) => {
        // Return only entries whose values are of type string[] - only those contain errors
        return Array.isArray(value)
          ? { ...previous, [key]: value }
          : { ...previous };
      }, {});

      return {
        title: err.message,
        errors,
      };
    } else if (err instanceof Error) {
      return {
        title: err.message,
      };
    }
    return {
      title: err as string,
    };
  });

  // Use refs and watchers to compute enhancedMainCategories, enhancedSubcategories
  // such that it is possible to clean the errors if necessary

  const enhancedMainCategories = ref<Category[]>([]);
  const enhancedSubcategories = ref<SubCategory[]>([]);

  watch(
    () => [responseErrors.value, categories.value],
    () => {
      const err = responseErrors.value;

      if (err == null) {
        enhancedMainCategories.value = categories.value;
        return;
      }

      const catWithErrors = categories.value.map((cat) => {
        const hasError = cat.subCategories.some((sub) =>
          sub.properties.some((prop) =>
            Object.values(prop.fields).some(
              (value) => err.errors?.[value] != null
            )
          )
        );

        return hasError ? { ...cat, isAnyFieldError: hasError } : { ...cat };
      });

      enhancedMainCategories.value = catWithErrors;
    },
    { immediate: true }
  );

  watch(
    () => [responseErrors.value, subcategories.value],
    () => {
      const err = responseErrors.value;

      if (err == null) {
        enhancedSubcategories.value = subcategories.value;
        return;
      }

      const subWithErrors = subcategories.value.map((sub) => {
        const properties = sub.properties.map((prop) => {
          const entryKey = Object.values(prop.fields).find(
            (value) => err.errors?.[value] != null
          );

          return entryKey == undefined
            ? { ...prop }
            : { ...prop, errors: err.errors?.[entryKey] };
        });

        return { ...sub, properties };
      });

      enhancedSubcategories.value = subWithErrors;
    },
    { immediate: true }
  );

  // Clean errors by resetting values to default
  const cleanErrors = () => {
    enhancedMainCategories.value = categories.value;
    enhancedSubcategories.value = subcategories.value;
  };

  return {
    enhancedMainCategories,
    enhancedSubcategories,
    cleanErrors,
  };
};
