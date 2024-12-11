<template>
   <a :href="link.link" target="_blank" class="cursor-pointer flex items-center py-2 px-4 rounded-full border border-black/10 h-[32px] gap-3 bg-white">
      <Icon :icon="link.icon" />
      <div class="h-[16px] w-px bg-black/10"></div>
      <span class="text-sm">{{ link.title }}</span>
   </a>
</template>

<script setup>
import { Icon } from '@iconify/vue/dist/iconify.js';
defineProps(['link'])
</script>

<style lang="scss" scoped></style>