<template>
   <div :id="category.id">
      <PageTitle class="mb-8"> {{ category.title }} </PageTitle>

      <div class="grid grid-cols-3 gap-8 mb-16">
         <PostCard v-for="(post, i) in gridPosts" :key="i" :post="post" />
      </div>

      <div class="flex flex-col items-start gap-8 mb-6">
         <PostList v-for="(post, i) in listPosts" :key="i" :post="post" />
      </div>

      <div class="border-t border-t-black/10 border-b border-b-black/10 py-4">
         <h1 class="font-normal text-sm">
            <font class="text-primary">{{ category.title }}</font> alanında {{ category.posts.length }} yazı var.
         </h1>
      </div>
   </div>

</template>

<script setup>
import { computed } from 'vue';
import PageTitle from './PageTitle.vue';
import PostCard from './PostCard.vue';
import PostList from './PostList.vue';
const props = defineProps(['category'])

const gridPosts = computed(() => props.category.posts.slice(0, 3));
const listPosts = computed(() => props.category.posts.slice(3));
</script>

<style lang="scss" scoped></style>