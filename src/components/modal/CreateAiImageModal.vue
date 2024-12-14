<template>
   <Modal v-if="modalStore.createAiImageModal">
      <div class="w-[458px] bg-dark-800 border border-dark-700 rounded-3xl p-4 mx-5 md:mx-0">
         <div class="flex items-center justify-between w-full mb-10">
            <div class="w-5 h-5"></div>
            <div class="flex items-center justify-center gap-2">
               <Icon icon="solar:star-ring-broken" class="text-2xl" />
               <h1 class="text-sm">AI görsel oluştur</h1>
            </div>

            <button @click="onCompleteImageProcess" class="h-5 w-5 pr-5">
               <Icon icon="mdi:check" class="text-2xl" />
            </button>
         </div>

         <div v-if="state.images.length">
            <ImageGallery @onDeleteImage="onDeleteImage" :images="state.images" />
         </div>

         <div :class="['flex items-start gap-2', {
            'mt-8': state.images.length
         }]">
            <Icon icon="mingcute:pencil-3-line" class="text-2xl" />
            <textarea v-model="state.query" class="text-sm outline-none resize-none w-full bg-transparent"
               placeholder="Neyi hayal ediyorsun?" rows="9"></textarea>
         </div>


         <button @click="onPressSubmit" :class="['text-white flex items-center rounded-full justify-center btn-primary h-[48px] text-sm w-[48px] mx-auto', {
            'opacity-50 cursor-not-allowed': verifyLoading
         }]" style="box-shadow: 0px 0px 40px 0px #D33857CC;">
            <Loading v-if="state.creating" size="30" />
            <Icon v-else icon="mdi:plus" class="text-3xl" />
         </button>
      </div>
   </Modal>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import { modalStore } from "../../store/modal";
import Loading from "../../components/common/Loading.vue";
import Modal from "./index.vue";
import { Icon } from "@iconify/vue/dist/iconify.js";
import { useToast } from "vue-toast-notification";
import axios from "../../axios";
import ImageGallery from "../common/ImageGallery.vue";

const $toast = useToast();
const emit = defineEmits(['onGetImages']);

const state = reactive({
   creating: false,
   query: "",
   images: []
});


const onDeleteImage = (index) => {
   state.images = state.images.filter((e, i) => i !== index);
}
const onCompleteImageProcess = async () => {
   emit('onGetImages', state.images);
   modalStore.createAiImageModal = false;
   state.images = [];
   state.query = "";
   state.creating = false;
};

const onPressSubmit = async () => {
   if (state.query.length <= 0) {
      $toast.error('Lütfen bir şeyler yazın!', { position: "top" });
      return;
   }
   state.creating = true;
   try {
      const { data } = await axios.post('/ai/image', { prompt: state.query });
      state.images.push(data.image);
      state.query = "";
   } catch (error) {
      $toast.error('Bir hata oluştu!', { position: "top" });
   } finally {
      state.creating = false;
   }
};

</script>
