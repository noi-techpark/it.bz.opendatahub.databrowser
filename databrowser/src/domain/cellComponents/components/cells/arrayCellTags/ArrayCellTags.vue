<template>
  <div>
    <!-- <button @click="more = !more">+more</button>
    <span v-if="more">{{ newItems?.join(separator) }}</span>
    <span v-else>more</span> -->
    <button @click="more = !more">Button</button>

    <h1 v-if="more">Vue is more!</h1>
    <h1 v-else>less</h1>
 
  <!-- <button
      class="rounded"
      :class="[more ? 'text-green-500' : 'text-gray-400']"
      :disabled="more"
      @click="paginateTo(nextIndex)"
    >hi
      <IconStrokedArrowDown class="w-5 h-5 -rotate-90 stroke-current" />
    </button>

   <ButtonCustom
        size="s"
        class="w-9 h-6 rounded-l-none"
        @click="more = true"
      >
        + more 
    </ButtonCustom>
     -->
    <!-- <h1 v-if="more === true">Vue is more!</h1>
    <h1 v-else>less</h1> -->

  
    <!-- <span v-if="newItems != null">{{ newItems?.join(separator) }}</span>  -->

  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, toRefs, computed } from 'vue';
import ButtonCustom from '../../../../../components/button/ButtonCustom.vue';

const props = withDefaults(
  defineProps<{
    items?: {}[];
    separator?: string;
    max?: string;
    fieldName?: string;
  }>(),
  {
    items: undefined,
    separator: undefined,
    max: undefined, 
    fieldName: undefined
  }
);

const {items, max, fieldName} = toRefs(props);

const test= computed(() => {
	  return {
    	more: true
  	}
	})

const more = () => {
  return {
    	more: false
  	}
};

const newItems = computed(() => {
  
  return [...items.value.map((item) => item.hasOwnProperty(fieldName.value) ? item[fieldName.value] : "").slice(0,parseInt(max.value))]
})

</script>

