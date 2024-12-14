<template>
   <div class="py-8 px-6 flex items-start gap-4 w-full border-b border-b-dark-800">
      <Avatar :src="userStore.user.photos[0]" class="w-12 h-12 rounded-full" />

      <div class="flex flex-col items-start w-full gap-4">
         <ImageGallery :images="state.images" @onDeleteImage="onDeleteImage" />
         <textarea v-model="state.text" rows="5" placeholder="Aklından geçenleri yaz..."
            class="outline-none border-0 placeholder:text-dark-400 bg-transparent resize-none w-full"></textarea>

         <div class="w-full flex items-center justify-between">
            <div class="flex items-center gap-2">
               <Icon @click="focusFileInput" icon="stash:image-duotone" class="text-3xl" />
               <Icon icon="fluent:video-24-regular" class="text-3xl" />
            </div>
            <div class="flex items-center gap-2">
               <button @click="onPressAiImage" :class="['btn-primary rounded-full h-[48px] px-4 flex items-center justify-center gap-2', {
                  'opacity-50: cursor-not-allowed': state.creating
               }]">
                  <Icon icon="solar:star-ring-broken" class="text-2xl" />
                  <span class="text-sm">AI Görsel Oluştur</span>
               </button>
               <button v-if="state.text.length > 0 || state.images.length > 0" @click="onCreatePost" :class="['btn-primary w-[48px] h-[48px] rounded-full flex items-center justify-center', {
                  'opacity-50 cursor-not-allowed': state.creating,
                  'opacity-100: cursor-pointer': !state.creating
               }]">
                  <Loading v-if="state.creating" size="30" />
                  <Icon v-else class="text-white text-2xl" icon="cil:send" />
               </button>
            </div>
         </div>
      </div>
   </div>



   <input type="file" hidden ref="fileInput" @change="handleImages">
   <CreateAiImageModal @on-get-images="handleAiImages" />
</template>

<script setup>
import { Icon } from '@iconify/vue/dist/iconify.js';
import Avatar from '../Avatar.vue';
import { userStore } from '../../../store/user';
import CreateAiImageModal from '../../modal/CreateAiImageModal.vue';
import { modalStore } from '../../../store/modal';
import ImageGallery from '../ImageGallery.vue';
import { computed, reactive, ref } from 'vue';
import Loading from '../Loading.vue';
import axios from '../../../axios';
import { useToast } from 'vue-toast-notification';

const $toast = useToast();

const fileInput = ref();

const state = reactive({
   images: [],
   text: "",
   creating: false
});


const onPressAiImage = () => {
   if (state.creating) {
      return;
   }
   modalStore.createAiImageModal = true
}
const focusFileInput = () => {
   fileInput.value?.click();
}

const onDeleteImage = (index) => {
   state.images = state.images.filter((e, i) => index !== i);
}

const handleImages = ($event) => {
   const files = $event.target.files;

   if (files.length > 0) {
      state.images.push(files[0]);
   }
}

const handleAiImages = (files) => {
   state.images = [...state.images, ...files];
}
const onCreatePost = async () => {
   try {
      state.creating = true;
      const aiImages = state.images.filter((e) => typeof e == 'string');
      const files = state.images.filter((e) => typeof e == 'object');
      const text = state.text;

      const fd = new FormData();
      for (let file of files) {
         fd.append('files', file);
      }
      fd.append('text', text);
      fd.append('aiImages', aiImages);

      await axios.post('/post', fd);
      window.location.reload();
      
   } catch (error) {
      $toast.error('Gönderi oluşturulurken bir hata oluştu!', { position: "top" });
   } finally {
      state.creating = false;
   }

}

</script>

<style lang="scss" scoped></style>