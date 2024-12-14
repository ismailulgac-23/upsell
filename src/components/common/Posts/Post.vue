<template>
   <div class="py-8 flex items-start gap-4 px-6 w-full border-b border-b-dark-800">
      <img :src="getImage(state.post.creator.photos[0])" class="w-12 h-12 rounded-full" />
      <div class="flex flex-col items-start w-full">
         <div class="w-full flex items-center justify-between mb-4">
            <div class="flex items-center gap-4">
               <div class="flex flex-col items-start">
                  <div class="flex items-center gap-2">
                     <h1 class="text-base font-semibold">{{ state.post.creator.fullName }}</h1>
                     <img src="/verified.png" class="w-4 h-4" />
                  </div>
                  <div class="flex items-center gap-3">
                     <div class="flex items-center gap-0.5">
                        <Icon icon="ph:gender-female" class="text-lg text-dark-400" />
                        <span class="text-sm text-dark-400">{{ GENDERS[state.post.creator.gender] }}</span>
                     </div>
                     <div class="flex items-center gap-0.5">
                        <Icon icon="ic:outline-cake" class="text-lg text-dark-400" />
                        <span class="text-sm text-dark-400">{{ getAgeFromDate(state.post.creator.birthday) }}</span>
                     </div>
                  </div>
               </div>
            </div>

            <div class="flex items-center gap-3">
               <h1 class="text-sm text-dark-400">
                  <timeago :datetime="post.createdAt" />
               </h1>
               <Icon icon="ri:more-fill" class="text-lg text-dark-400" />
            </div>
         </div>

         <p class="text-sm mb-7">
            {{ post.text }}
         </p>

         <div v-if="post.files.length > 0" class="grid grid-cols-2 gap-4 mb-6">
            <img v-for="(file, index) in post.files" :key="index" :src="getImage(file.source)" />
         </div>

         <div class="w-full flex items-center justify-between">
            <div class="flex items-center gap-4">
               <div @click="onPressLike" class="select-none flex items-center gap-2 cursor-pointer">
                  <Icon :class="['text-2xl', getIsLikedClasses]" icon="mingcute:heart-fill" />
                  <span :class="['text-sm font-normal', getIsLikedClasses]">{{ state.post.likes.length }}</span>
               </div>

               <div @click="state.isOpenedCommentsModal = true" class="cursor-pointer flex items-center gap-2">
                  <Icon class="text-dark-400 text-2xl" icon="mingcute:chat-2-line" />
                  <span class="text-sm text-dark-400 font-normal">{{ state.post.comments.length }}</span>
               </div>
            </div>
            <div class="flex items-center gap-2">
               <Icon class="text-dark-400 text-2xl" icon="cil:send" />
               <span class="text-sm text-dark-400 font-normal">Gönder</span>
            </div>
         </div>
      </div>
   </div>
   <CommentsModal v-if="state.isOpenedCommentsModal" :comments="state.post.comments"
      @onSubmittedComment="onSubmittedComment" :postId="state.post.id"
      :close="() => state.isOpenedCommentsModal = false" />
</template>

<script setup>
import { Icon } from '@iconify/vue/dist/iconify.js';
import { modalStore } from "../../../store/modal";
import CommentsModal from '../../modal/CommentsModal.vue';
import axios, { getImage } from '../../../axios';
import { GENDERS, getAgeFromDate } from '../../../helpers';
import { computed, onMounted, reactive, ref } from 'vue';

const props = defineProps(['post'])


const state = reactive({
   post: props.post,
   isLiked: false,
   isOpenedCommentsModal: false
});

const getIsLikedClasses = computed(() => ({
   'text-[#D33857]': state.isLiked,
   'text-dark-400': !state.isLiked
}));

const onSubmittedComment = (comment) => {
   state.post.comments.unshift(comment);
}

const setIsLiked = () => {
   if (props.post.likes.length > 0) state.isLiked = true;
   else state.isLiked = false;
}

const onPressLike = async () => {
   state.isLiked = !state.isLiked;
   try {
      if (state.isLiked) {
         const { data } = await axios.post('/post-like/like', { postId: state.post.id });
         state.post.likes.push(data);
      } else {
         await axios.post('/post-like/unlike', { postId: state.post.id });
         state.post.likes = [];
      }
   } catch (error) {

   } finally {
      setIsLiked();
   }
}

onMounted(() => {
   setIsLiked();
})

</script>

<style lang="scss" scoped></style>