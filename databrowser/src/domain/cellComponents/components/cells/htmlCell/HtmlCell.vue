<template>
  <div v-if="isWriteable" class="relative z-10 flex flex-col">
    <QuillEditor
      v-if="isWriteable"
      ref="quill"
      :content="html"
      content-type="html"
      theme="snow"
      :toolbar="toolbar"
      @update:content="contentChange"
    />
  </div>

  <div
    v-else
    class="html-content rounded border border-gray-400 p-2"
    v-html="html"
  ></div>
</template>

<script setup lang="ts">
import {
  defineAsyncComponent,
  defineEmits,
  defineProps,
  ref,
  toRefs,
  withDefaults,
} from 'vue';
import { useWriteable } from '../../utils/writeable/useWriteable';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const QuillEditor = defineAsyncComponent(() =>
  import('@vueup/vue-quill').then((exports) => exports.QuillEditor)
);

const quill = ref();

const contentChange = () => {
  const value = quill.value.getContents();
  emit('update', { prop: 'html', value });
};

const emit = defineEmits(['update']);

const props = withDefaults(
  defineProps<{
    html?: string;
    editable?: boolean;
    readonly?: string | boolean;
  }>(),
  {
    html: undefined,
    editable: true,
    readonly: false,
  }
);

const { editable, readonly } = toRefs(props);
const isWriteable = useWriteable({ editable, readonly });

const toolbar = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote'],
  [{ header: 1 }, { header: 2 }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  ['clean'],
];
</script>

<style>
.ql-toolbar {
  @apply rounded-t;
}
.ql-container {
  @apply font-normal text-base text-black rounded-b;
}
.ql-editor {
  @apply p-2;
}

.ql-editor ol,
.ql-editor ul {
  @apply list-disc m-2 pl-2;
}

.ql-editor a {
  @apply text-green-500;
}

.ql-editor blockquote {
  @apply p-2 border-l-8 border-gray-500;
}

.html-content ol,
.html-content ul {
  @apply list-disc m-2 pl-2;
}

.html-content a {
  @apply text-green-500;
}

.html-content blockquote {
  @apply p-2 border-l-4 border-gray-500;
}
</style>
