<template>
   <div class="w-full">
      <PageTitle class="mb-8">Bilgilerim</PageTitle>

      <div class="grid grid-cols-5 w-full gap-5">
         <Upload :profile-image="profileImage" v-on:handle-change-files="handleChangeFiles" />

         <div class="flex flex-col items-start w-full">
            <label class="text-sm mb-1.5">Ad & Soyad</label>
            <input v-model="state.fullName" class="border outline-none w-full border-gray-200 p-2 rounded-md"
               type="text" placeholder="" />
         </div>

         <div class="flex flex-col items-start w-full">
            <label class="text-sm mb-1.5">Meslek</label>
            <input v-model="state.job" class="border outline-none w-full border-gray-200 p-2 rounded-md" type="text"
               placeholder="" />
         </div>

         <div class="flex flex-col items-start w-full">
            <label class="text-sm mb-1.5">Kullanıcı Adı</label>
            <input v-model="state.username" class="border outline-none w-full border-gray-200 p-2 rounded-md"
               type="text" placeholder="" />
         </div>
         <div class="flex flex-col items-start w-full">
            <label class="text-sm mb-1.5">Yeni Parola</label>
            <input v-model="state.password" class="border outline-none w-full border-gray-200 p-2 rounded-md"
               type="password" placeholder="" />
         </div>

      </div>

      <EditSocialMediaLink :social-links="state.socialLinks" @getSocialMediaLinks="getSocialMediaLinks" class="mb-8" />

      <Button @click="onPressSave">Profili Kaydet</Button>

   </div>
</template>

<script setup>

import { Icon } from '@iconify/vue/dist/iconify.js';
import PageTitle from '../../components/PageTitle.vue';
import EditSocialMediaLink from '../../components/EditSocialMediaLink.vue';
import { computed, onMounted, reactive, ref } from 'vue';
import Button from '../../components/Button.vue';
import { useToast } from 'vue-toast-notification';
import axios from '../../axios';
import { store } from '../../store';
import Upload from '../../components/Upload.vue';


const $toast = useToast();

const state = reactive({
   fullName: "",
   job: "",
   username: "",
   password: "",
   socialLinks: [],
   image: null
});

const profileImage = computed(() => {
   if (state.image == null) return null;
   return URL.createObjectURL(state.image);
});



const onPressSave = async () => {
   try {
      const fd = new FormData();
      fd.append('fullName', state.fullName);
      fd.append('job', state.job);
      fd.append('username', state.username);
      fd.append('password', state.password);
      fd.append('socialLinks', JSON.stringify(state.socialLinks));
      if (state.image != null) {
         fd.append('file', state.image);
      }
      const response = await axios.patch('/admin/user', fd);
      store.user = response.data.user;
      store.token = response.data.token;
      localStorage.setItem('token', response.data.token);
      $toast.success(response.data.message, { position: "top" });
      clearInputs();
   } catch (error) {
      $toast.error(error.response.data.message, { position: "top" });
   }
}

const clearInputs = () => {
   state.image = null;
}

const handleChangeFiles = (event) => {
   const files = event.target.files;
   if (!files.length) return;
   state.image = files[0];
}

const getSocialMediaLinks = (links) => {
   state.socialLinks = links;
}

const setUserInfo = () => {
   state.fullName = store.user.fullName;
   state.job = store.user.job;
   state.socialLinks = store.user.socialLinks.map((e) => ({ link: e.link, icon: e.icon, id: e.id }));
   state.username = store.user.username;
}

onMounted(() => {
   setUserInfo();
});


</script>

<style lang="scss" scoped></style>