<template>
   <div class="w-screen h-screen fixed top-0 left-0 bg-black/[0.2] overflow-hidden z-50">
      <div class="flex items-center justify-center w-full h-full">
         <slot></slot>
      </div>
   </div>
</template>

<script setup>
import { Icon } from '@iconify/vue/dist/iconify.js';
</script>

<style lang="scss" scoped></style>