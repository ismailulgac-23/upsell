<template>
   <button :class="getButtonClasses">
      <slot></slot>
   </button>
</template>

<script setup>

import { computed } from 'vue';
const props = defineProps({
   type: {
      required: false,
      default: "light",
   }
});

const getButtonClasses = computed(() => {
   return ["py-2 px-4 text-sm font-normal text-primary rounded-md", {
      'bg-primary/10': props.type=='light'
   }]
});
</script>

<style lang="scss" scoped></style>