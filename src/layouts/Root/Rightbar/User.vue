<template>
   <div class="flex items-center justify-between w-full">
      <router-link :to="`/user/${user.id}`" class="flex items-center gap-3">
         <Avatar :src="user.photos[0]" class="w-12 h-12 rounded-full" />
         <div class="flex flex-col items-start">
            <div class="flex items-center gap-2">
               <h1 class="text-sm font-semibold">{{user.fullName.length > 8 ? user.fullName.slice(0,8)+'...' : user.fullName}}</h1>
               <img src="/verified.png" class="w-4 h-4" />
            </div>
         </div>
      </router-link>

      <button class="btn-primary h-[32px] px-4 text-sm rounded-full">Beğen</button>
   </div>
</template>

<script setup>
import Avatar from '../../../components/common/Avatar.vue';

defineProps(['user'])
</script>

<style lang="scss" scoped></style>