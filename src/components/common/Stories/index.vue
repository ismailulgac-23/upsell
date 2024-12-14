<template>
   <div class="py-8 px-6 border-b border-b-dark-800">
      <Loading v-if="state.loading" />
      <div v-else class="w-full h-full flex items-center gap-5 overflow-x-auto no-scrollbar">
         <MeStory />
         <Story v-for="story in state.stories" :key="story.id" :story="story" />
      </div>
   </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import axios from '../../../axios';
import Loading from '../Loading.vue';
import { useToast } from 'vue-toast-notification';
import Story from './Story.vue';
import MeStory from './MeStory.vue';

const $toast = useToast();

const state = reactive({
   loading: false,
   stories: []
});

const fetchStories = async () => {
   state.loading = true;
   try {
      const { data } = await axios.get('/story');
      state.stories = data;

   } catch (error) {
      $toast.error('Hikayeler getirilirken bir sorun oluştu!', { position: "top" });
   } finally {
      state.loading = false;
   }
}

onMounted(() => {
   fetchStories();
});
</script>

<style lang="scss" scoped></style>