<template>
   <router-link :to="`/live/${live.id}`" class="h-[400px] w-full">
      <div class="relative">

         <div class="bg-cover bg-no-repeat h-[340px] mb-4 relative rounded-3xl" :style="`background-image: url('${getImage(live.creator.photos[0])}');`">
            <div class="absolute top-4 left-4 flex items-center gap-2">
               <Avatar :src="live.creator.photos[0]" class="w-6 h-5 rounded-full" />
               <h1 class="text-sm font-bold">{{live.creator.fullName}},</h1>
               <span class="text-sm font-light">{{getAgeFromDate(live.creator.birthday)}}</span>
               <img src="/verified-blue.png" class="w-2.5 h-2.5" />
            </div>
         </div>

         <p class="h-[60px] w-full">
            {{live.roomName}}
         </p>

      </div>
   </router-link>
</template>

<script setup>
import { getImage } from '../../axios';
import { getAgeFromDate } from '../../helpers';
import Avatar from './Avatar.vue';

const props = defineProps(['live'])
</script>

<style lang="scss" scoped></style>