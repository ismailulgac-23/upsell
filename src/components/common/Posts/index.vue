<template>
   <Loading v-if="state.loading" />
   <div v-if="state.posts.length > 0" class="flex flex-col items-start w-full">
      <Post v-for="post in state.posts" :key="post.id" :post="post" />
   </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import Loading from "../Loading.vue";
import Post from "./Post.vue";
import axios from "../../../axios";
import { useToast } from "vue-toast-notification";

const props = defineProps({
   userId: {
      type: String,
      required: false
   }
});

const $toast = useToast();

const state = reactive({
   loading: false,
   posts: []
});

const fetchPosts = async () => {
   state.loading = true;
   try {
      const params = new URLSearchParams();
      if (props.userId) {
         params.append('userId', props.userId);
      }
      const { data } = await axios.get(`/post?${params.toString()}`);
      state.posts = data;

   } catch (error) {
      $toast.error('Gönderiler getirilirken bir sorun oluştu!', { position: "top" });
   } finally {
      state.loading = false;
   }
}

onMounted(() => {
   fetchPosts();
});

</script>

<style lang="scss" scoped></style>