<template>
   <div class="w-full">
      <div class="flex items-center justify-between w-full">
         <PageTitle class="mb-8">Yazılarım</PageTitle>
         <router-link to="/admin/posts/create">
            <Button>Yeni Yazı Ekle</Button>
         </router-link>
      </div>

      <table class="table-auto w-full border">
         <thead class="text-left bg-gray-100">
            <tr>
               <th class="p-3">Fotoğraf</th>
               <th class="p-3">Başlık</th>
               <th class="p-3">Oluşturulma Tarihi</th>
               <th class="p-3"> - </th>
            </tr>
         </thead>
         <tbody>
            <tr v-for="(post, index) in posts" :key="index">
               <td class="p-3">
                  <img :src="getImage('post', post.thumbnail)" class="w-24 h-24 rounded-lg" />
               </td>
               <td class="p-3">
                  {{ post.title }}</td>
               <td class="p-3">{{ post.createdAt }}</td>
               <td>
                  <div class="flex items-center gap-3">
                     <router-link :to="`/admin/posts/${post.id}`">
                        <Button>Düzenle</Button>
                     </router-link>
                     <Button @click="onDeletePost(post.id)">Kaldır</Button>
                  </div>
               </td>
            </tr>
         </tbody>
      </table>
   </div>
</template>

<script setup>

import { onMounted, ref } from 'vue';
import PageTitle from '../../components/PageTitle.vue';
import axios from '../../axios';
import { getImage } from '../../helpers';
import Button from '../../components/Button.vue';
import { useToast } from 'vue-toast-notification';

const $toast = useToast();

const posts = ref([]);

const onDeletePost = async (id) => {
   try {
      const { data } = await axios.delete(`/admin/post/${id}`);
      posts.value = posts.value.filter((e) => e.id !== id);
      $toast.success(data.message, { position: "top" });
   } catch (error) {
      $toast.error(response.data.message, { position: "top" });
   }
}

const fetchPosts = async () => {
   try {
      const { data } = await axios.get('/admin/post');
      posts.value = data;
   } catch (error) {

   }
}

onMounted(() => {
   fetchPosts();
});

</script>

<style lang="scss" scoped></style>