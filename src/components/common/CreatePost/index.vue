<template>
   <div class="py-8 px-6 flex items-start gap-4 w-full border-b border-b-dark-800">
      <Avatar :src="userStore.user.photos[0]" class="w-12 h-12 rounded-full" />

      <div class="flex flex-col items-start w-full gap-4">
         <textarea rows="5" placeholder="Aklından geçenleri yaz..."
            class="outline-none border-0 placeholder:text-dark-400 bg-transparent resize-none w-full"></textarea>

         <div class="w-full flex items-center justify-between">
            <div class="flex items-center gap-2">
               <Icon icon="stash:image-duotone" class="text-3xl" />
               <Icon icon="fluent:video-24-regular" class="text-3xl" />
            </div>
            <button class="btn-primary rounded-full h-[48px] px-4 flex items-center justify-center gap-2">
               <Icon icon="solar:star-ring-broken" class="text-2xl" />
               <span class="text-sm">AI Görsel Oluştur</span>
            </button>
         </div>
      </div>
   </div>
</template>

<script setup>
import { Icon } from '@iconify/vue/dist/iconify.js';
import Avatar from '../Avatar.vue';
import { userStore } from '../../../store/user';


</script>

<style lang="scss" scoped></style>