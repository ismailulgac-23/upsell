<template>
   <IntroPost class="mb-16" :post="state.introPost" />
   <CategoryPosts v-for="(category, index) in store.categoryAndPosts" :key="index" class="mb-16" :category="category" />
   <AboutCard class="mb-16" />
</template>

<script setup>

import { onMounted, reactive } from 'vue';
import axios from '../../axios';
import AboutCard from '../../components/AboutCard.vue';
import CategoryPosts from '../../components/CategoryPosts.vue';
import IntroPost from '../../components/IntroPost.vue';
import { store } from '../../store';

const state = reactive({
   loading: true,
   introPost: {},
});

const fetchIntroPost = async () => {
   try {
      const { data } = await axios.get('/client/post/intro');
      state.introPost = data;
   } catch (error) {

   }
}
const fetchCategoryAndPosts = async () => {
   try {
      const { data } = await axios.get('/client/post');
      store.categoryAndPosts = data;
   } catch (error) {

   }
}

onMounted(() => {
   fetchIntroPost();
   fetchCategoryAndPosts();
});

</script>

<style lang="scss" scoped></style>