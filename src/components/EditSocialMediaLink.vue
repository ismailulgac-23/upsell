<script setup>

import { Icon } from '@iconify/vue/dist/iconify.js';
import Button from './Button.vue';
import PageTitle from './PageTitle.vue';
import { onMounted, reactive, ref, watch } from 'vue';
import {v4} from "uuid";

const props = defineProps(['socialLinks']);

const emit = defineEmits(['getSocialMediaLinks'])


const state = reactive({
   socialLink: {
      id: null,
      icon: null,
      link: ""
   },
   links: []
});


const onPressAdd = () => {
   if (state.socialLink.icon == null || !state.socialLink.link.length) return;
   state.links.push({ ...state.socialLink, id: v4() });
   state.socialLink = {
      id: null,
      icon: null,
      link: ""
   };
}

const onPressDeleteLink = (id) => {
   state.links = state.links.filter((e) => e.id !== id);
}

watch(() => state.links, (value) => {
   emit('getSocialMediaLinks', value);
}, { deep: true });

watch(() => props.socialLinks, (value) => {
   state.links = props.socialLinks;
});

</script>
<template>
   <div>
      <PageTitle class="mb-8">Sosyal Medya Linklerim</PageTitle>

      <div class="max-w-md w-full">
         <div class="flex items-center justify-between gap-2 w-full mb-8">
            <div class="flex-1 flex items-center gap-3">
               <div class="w-max" v-if="state.socialLink.icon != null">
                  <Icon :icon="state.socialLink.icon" class="text-3xl" />
               </div>
               <select v-model="state.socialLink.icon"
                  class="flex-1 text-sm placeholder:text-sm border border-gray-200 p-2.5 rounded-md outline-none">
                  <option :value="null" disabled>Sosyal Medya Türü</option>
                  <option value="logos:instagram-icon">Instagram</option>
                  <option value="logos:linkedin-icon">Linkedin</option>
                  <option value="logos:facebook">Facebook</option>
                  <option value="pajamas:twitter">Twitter</option>
               </select>
               <input v-model="state.socialLink.link" type="text" placeholder="https://"
                  class="flex-1 text-sm placeholder:text-sm border border-gray-200 p-2.5 rounded-md outline-none">
            </div>
            <Button @click="onPressAdd" class="w-max">Ekle</Button>
         </div>

         <div class="flex flex-col items-start gap-4 w-full">
            <div v-for="(link, index) in state.links" :key="index" class="flex items-center justify-between w-full">
               <div class="flex items-center gap-2">
                  <Icon :icon="link.icon" class="text-xl" />
                  <h1 class="text-sm">{{ link.link }}</h1>
               </div>
               <Icon @click="onPressDeleteLink(link.id)" icon="mdi:close" class="cursor-pointer text-xl text-red-500" />
            </div>
         </div>
      </div>
   </div>
</template>



<style lang="scss" scoped></style>