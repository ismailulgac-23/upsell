<template>
   <Modal>
      <div class="w-[670px] h-2/3 bg-dark-800 border border-dark-700 rounded-3xl">
         <div class="flex flex-col items-start p-6 gap-5 overflow-y-auto no-scrollbar" style="height: calc(100% - 96px);">
            <div v-for="comment in comments" :key="comment.id" class="flex items-start gap-4">
               <img :src="getImage(comment.creator.photos[0])" class="w-8 h-8 rounded-full" />
               <div class="flex flex-col items-start w-full flex-shrink-0">
                  <div class="flex items-center justify-between w-full">
                     <div class="flex items-center gap-1 mb-2">
                        <h1 class="text-sm font-bold">{{ comment.creator.fullName }},
                           {{ getAgeFromDate(comment.creator.birthday) }}</h1>
                        <img src="/verified-blue.png" class="w-3.5 h-3.5" />
                     </div>
                  </div>

                  <p class="text-sm">
                     {{ comment.text }}
                  </p>
               </div>
            </div>
         </div>

         <div class="w-full h-24 border-t border-t-dark-700 p-6 flex items-center gap-3">
            <Avatar :src="userStore.user.photos[0]" class="w-10 h-10 rounded-full flex-shrink-0" />
            <input v-model="state.text" type="text" placeholder="Bir şeyler yazın..."
               class="rounded-full bg-dark-700 h-full w-full px-4 text-sm outline-none" />
            <button @click="handleCloseModal"
               class="flex-shrink-0 bg-dark-700 rounded-full w-12 h-12 flex items-center justify-center">
               <Icon class="text-2xl text-white" icon="cil:x" />
            </button>
            <button @click="onSubmitComment" :class="['flex-shrink-0 btn-primary rounded-full w-12 h-12 flex items-center justify-center', {
               'opacity-50 cursor-not-allowed': state.submitting
            }]">
               <Loading v-if="state.submitting" size="30" />
               <Icon v-else class="text-2xl text-white" icon="cil:send" />
            </button>
         </div>
      </div>
   </Modal>
</template>

<script setup>
import { reactive } from "vue";
import { modalStore } from "../../store/modal";
import Modal from "./index.vue";
import { Icon } from "@iconify/vue/dist/iconify.js";
import Loading from "../common/Loading.vue";
import axios, { getImage } from "../../axios";
import { useToast } from "vue-toast-notification";
import { getAgeFromDate } from "../../helpers";
import { userStore } from "../../store/user";
import Avatar from "../common/Avatar.vue";

const $toast = useToast();
const props = defineProps(['comments', 'postId', 'close'])
const emit = defineEmits(['onSubmittedComment']);

const state = reactive({
   submitting: false,
   text: ""
});

const handleCloseModal = () => {
   props.close();
   state.submitting = false;
   state.text = "";
}

const onSubmitComment = async () => {
   state.submitting = true;
   try {
      const { data } = await axios.post('/post-comment', { postId: props.postId, text: state.text });
      emit('onSubmittedComment', data);
   } catch (error) {
      $toast.error('Yorum gönderilirken bir sorun oluştu!', { position: "top" });
   } finally {
      state.submitting = false;
      state.text = "";
   }
}
</script>

<style lang="scss" scoped></style>