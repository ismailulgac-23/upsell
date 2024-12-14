<template>
   <div class="flex-shrink-0 flex flex-col items-center justify-center gap-2 cursor-pointer">
      <Avatar :src="story.photos[0]" class="w-16 h-16 rounded-full" :story="true" />
      <h1 class="text-sm">{{ story.fullName }}</h1>
   </div>
</template>

<script setup>
import { getImage } from '../../../axios';
import Avatar from '../Avatar.vue';

defineProps(['story'])
</script>

<style lang="scss" scoped></style>