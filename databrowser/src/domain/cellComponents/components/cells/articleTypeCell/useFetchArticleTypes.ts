import { computed, Ref } from 'vue';
import { useQuery } from 'vue-query';
import { useAxiosFetcher } from '../../../../api';

type ArticleSubTypes = string[];
type ArticleTypes = Record<string, ArticleSubTypes>;

interface ArticleTypeResponse {
  // Equals selectbox-option key
  Id: string;
  // Equals selectbox-option label
  Key: string;
  // Either ArticleType ArticleSubType
  Type: 'ArticleType' | 'ArticleSubType';
  // Set if Type has a value of 'ArticleSubType'; points to the ID of the ArticleType (=parent)
  Parent: string;
  // Not interesting
  Bitmask: number;
  // Always an empty object
  TypeDesc: Record<string, unknown>;
}

export const useFetchArticleTypes = (lookupUrl: Ref<string | undefined>) => {
  const queryKey = lookupUrl;
  const queryFn = useAxiosFetcher();
  const response = useQuery({ queryKey, queryFn });

  const articleTypesHierarchy = computed(() => {
    if (!response.isSuccess.value) {
      return {};
    }

    const data = (response.data?.value?.data as ArticleTypeResponse[]) ?? [];

    return data.reduce<ArticleTypes>((knownTypes, curr) => {
      // Skip entries of type ArticleType completely, all information
      // can be extracted from entries of type ArticleSubType
      if (curr.Type === 'ArticleType') {
        return { ...knownTypes, [curr.Key]: [] };
      }

      return knownTypes[curr.Parent] == null
        ? { ...knownTypes, [curr.Parent]: [curr.Key] }
        : {
            ...knownTypes,
            [curr.Parent]: [...knownTypes[curr.Parent], curr.Key],
          };
    }, {});
  });

  return { articleTypesHierarchy };
};
