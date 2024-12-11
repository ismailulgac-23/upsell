<template>
   <div class="w-screen h-screen flex items-start overflow-hidden">
      <Sidebar v-if="store.user != null" />
      <div :class="['w-full',{ 'p-10': store.user != null }]">
         <router-view></router-view>
      </div>
   </div>
</template>

<script setup>

import { store } from '../../store';
import Sidebar from './Sidebar.vue';

</script>

<style lang="scss" scoped></style>