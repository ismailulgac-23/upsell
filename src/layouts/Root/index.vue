<template>
   <div class="flex gap-4 h-screen w-screen overflow-hidden">
      <div class="sidebar w-[280px] h-screen">
         <Sidebar />
      </div>
      <div class="h-full overscroll-y-auto overflow-x-hidden" style="width: calc(100% - 280px);">
         <router-view></router-view>
      </div>
   </div>
</template>

<script setup>
import Sidebar from "./Sidebar.vue";
</script>

<style scoped>
.sidebar {
   box-shadow: 0px 0px 12px 0px #F3F4F6;
   border: 1px solid #F3F4F6;
}

</style>
