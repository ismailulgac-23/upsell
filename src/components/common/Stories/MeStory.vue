<template>
   <div class="flex-shrink-0 flex flex-col items-center justify-center gap-2 cursor-pointer">
      <Avatar :self="true" :src="userStore.user.photos[0]" class="w-16 h-16 rounded-full" />
      <h1 class="text-sm">{{ userStore.user.fullName }}</h1>
   </div>
</template>

<script setup>
import { userStore } from '../../../store/user';
import Avatar from '../Avatar.vue';


</script>

<style lang="scss" scoped></style>