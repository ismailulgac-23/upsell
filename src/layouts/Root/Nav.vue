<template>
   <div class="w-full flex items-center justify-between h-[80px] border-b border-dark-800 px-5">
      <img src="/logo.png" class="w-[160px] h-[32px] object-cover" />
      <Icon @click="emit('onClickMenu')" icon="mdi:menu" class="text-3xl" />
   </div>
</template>

<script setup>
import { Icon } from '@iconify/vue/dist/iconify.js';

const emit = defineEmits(['onClickMenu'])
</script>

<style lang="scss" scoped></style>