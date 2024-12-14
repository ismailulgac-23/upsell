<template>
   <Loading v-if="state.loading" />
   <div v-else-if="!state.user" class="py-20">
      <h1 class="text-2xl font-medium text-center">Profil bulunamadı!</h1>
   </div>
   <div v-else>
      <div class="h-[80px] w-full border-b border-b-dark-800 flex items-center gap-4 px-4">
         <Avatar :src="state.user.photos[0]" class="w-14 h-14 rounded-full" />
         <div class="flex flex-col items-start">
            <h1 class="text-lg font-semibold">{{ state.user.fullName }}</h1>
            <span class="text-dark-400 text-sm">200 Gönderi</span>
         </div>
      </div>

      <div class="w-full">
         <img src="/profile-bg.png" class="w-full h-[240px]" />

         <div class="flex items-start justify-between w-full px-6 pt-8">
            <div class="-mt-20">
               <Avatar :src="state.user.photos[0]" class="w-24 h-24 rounded-full border-[6px] border-dark-900 mb-6" />
               <div class="flex items-center gap-2 mb-3">
                  <h1 class="text-lg font-semibold">{{ state.user.fullName }}</h1>
                  <img src="/verified-blue.png" class="w-4 h-4" />
               </div>
               <div class="flex items-center gap-3 mb-5">
                  <div class="flex items-center gap-0.5">
                     <Icon icon="ph:gender-female" class="text-lg text-white" />
                     <span class="text-sm text-white">{{ GENDERS[state.user.gender] }}</span>
                  </div>
                  <div class="flex items-center gap-0.5">
                     <Icon icon="ic:outline-cake" class="text-lg text-white" />
                     <span class="text-sm text-white">{{ getAgeFromDate(state.user.birthday) }}</span>
                  </div>
               </div>
               <div class="flex items-center gap-2 mb-6">
                  <div class="flex items-center justify-center h-9 btn-primary rounded-lg gap-1.5 px-2 flex-shrink-0">
                     <Icon icon="mingcute:heart-fill" class="text-white text-xl" />
                     <h1 class="text-sm font-medium">{{ state.user.reason }}</h1>
                  </div>
                  <div class="flex items-center justify-center h-9 bg-dark-800 rounded-lg gap-1.5 px-2 flex-shrink-0">
                     <Icon icon="mingcute:location-line" class="text-white text-xl" />
                     <h1 class="text-sm font-medium">{{ state.user.location ?? "-" }}</h1>
                  </div>
                  <div class="flex items-center justify-center h-9 bg-dark-800 rounded-lg gap-1.5 px-2 flex-shrink-0">
                     <Icon icon="tabler:briefcase" class="text-white text-xl" />
                     <h1 class="text-sm font-medium">{{ state.user.job ?? "-" }}</h1>
                  </div>
               </div>

            </div>
            <div class="flex items-center justify-center gap-2 pr-4">
               <button
                  class="flex-shrink-0 bg-white/5 h-[50px] px-7 rounded-full flex items-center justify-center gap-3">
                  <Icon icon="mynaui:edit-one" class="text-2xl" />
                  <h1 class="text-sm font-light">Profili Düzenle</h1>
               </button>
               <button class="flex-shrink-0 bg-white/5 w-[50px] h-[50px] rounded-full flex items-center justify-center">
                  <Icon icon="solar:link-minimalistic-2-broken" class="text-2xl" />
               </button>
            </div>
         </div>

         <div class="px-6">
            <p v-if="state.user.bio" class="text-sm font-normal mb-5">
               {{ state.user.bio }}
            </p>
         </div>
         <CreatePost class="border-t border-t-dark-800" v-if="state.user.id === userStore.user.id" />
         <Posts :user-id="state.user.id" />
      </div>
   </div>
</template>

<script setup>
import { onMounted, reactive, watch } from 'vue';
import Avatar from '../../components/common/Avatar.vue';
import CreatePost from "../../components/common/CreatePost/index.vue";
import Posts from "../../components/common/Posts/index.vue";

import { useToast } from 'vue-toast-notification';
import axios from '../../axios';
import { useRoute } from 'vue-router';
import Loading from '../../components/common/Loading.vue';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { GENDERS, getAgeFromDate } from '../../helpers';
import { userStore } from '../../store/user';

const $toast = useToast();
const route = useRoute();

const state = reactive({
   user: null,
   loading: false
});

const fetchUserProfile = async () => {
   const userId = route.params.id;
   state.loading = true;
   try {
      const { data } = await axios.get(`/user/${userId}`);
      state.user = data;
   } catch (error) {
      $toast.error("Profil yüklenirken bir sorun oluştu!", { position: "top" });
   } finally {
      state.loading = false;
   }
}

watch(route, val => {
   fetchUserProfile();
});

onMounted(() => {
   fetchUserProfile()
});

</script>

<style lang="scss" scoped></style>