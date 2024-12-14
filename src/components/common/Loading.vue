<template>
   <div class="py-10 mx-auto w-full grid place-items-center">
      <VueSpinnerOrbit :color="color" :size="size" />
   </div>

</template>

<script setup>
import { VueSpinnerOrbit } from 'vue3-spinners';
defineProps({
   size: {
      type: String,
      default: "40"
   },
   color: {
      type: String,
      default: "white"
   }
})
</script>

<style lang="scss" scoped></style>