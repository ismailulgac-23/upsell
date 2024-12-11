<template>
   <div class="flex flex-col items-center justify-center mb-12">
      <h1 class="text-center text-[36px] font-semibold mb-3">{{ state.post.title }}</h1>

      <div class="flex items-center gap-3 mb-8">
         <h1 class="text-black/60 text-sm font-light">{{ formatDate(state.post.createdAt)[0] }}</h1>
         <div class="w-1 h-1 rounded-full bg-primary"></div>
         <h1 class="text-black/60 text-sm font-light">{{ formatDate(state.post.createdAt)[1] }}</h1>
      </div>

      <div class="flex items-center gap-4 mb-12">
         <Link v-for="(link, index) in links" :key="index" :link="link" />
      </div>

      <img :src="getImage('post', state.post.thumbnail)" class="h-[475px] w-full rounded-[32px] mb-12 object-cover" />

      <p v-html="state.post.content" class="text-black/60 mb-5"> </p>


      <div class="w-full flex items-center gap-5 mt-12">
         <div class="h-0.5 bg-primary w-full"></div>
         <h1 class="text-primary font-semibold italic">Teşekkürler</h1>
         <div class="h-0.5 bg-primary w-full"></div>
      </div>
   </div>
</template>

<script setup>

import { onMounted, reactive } from 'vue';
import Link from '../../components/Link.vue';
import axios from '../../axios';
import { useRoute } from 'vue-router';
import { formatDate, getImage } from '../../helpers';


const route = useRoute();

const links = [
   { title: "WhatsApp", icon: "logos:whatsapp-icon", href: "" },
   { title: "Facebook", icon: "logos:facebook", href: "" },
   { title: "Twitter", icon: "pajamas:twitter", href: "" },
   { title: "Linkedin", icon: "logos:linkedin-icon", href: "" },
   { title: "Linki Kopyala", icon: "mdi:link", href: "" },
];

const state = reactive({
   post: {}
});

const fetchPost = async () => {
   try {
      const { data } = await axios.get(`/client/post/${route.params.id}`);
      state.post = data;
   } catch (error) {

   }
}
onMounted(() => {
   fetchPost();
});

</script>

<style lang="scss" scoped></style>