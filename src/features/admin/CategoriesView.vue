<template>
   <div class="w-full">
      <div class="flex items-center justify-between w-full">
         <PageTitle class="mb-8">Kategoriler</PageTitle>
         <router-link to="/admin/categories/create">
            <Button>Yeni Kategori Ekle</Button>
         </router-link>
      </div>

      <table class="table-auto w-full border">
         <thead class="text-left bg-gray-100">
            <tr>
               <th class="p-3">Başlık</th>
               <th class="p-3"> - </th>
            </tr>
         </thead>
         <tbody>
            <tr v-for="(category, index) in categories" :key="index">
               <td class="p-3">
                  {{ category.title }}</td>
               <td>
                  <div class="flex items-center gap-3">
                     <router-link :to="`/admin/categories/${category.id}`">
                        <Button>Düzenle</Button>
                     </router-link>
                     <Button @click="onDeleteCategory(category.id)">Kaldır</Button>
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

const categories = ref([]);

const onDeleteCategory = async (id) => {
   try {
      const { data } = await axios.delete(`/admin/category/${id}`);
      categories.value = categories.value.filter((e) => e.id !== id);
      $toast.success(data.message, { position: "top" });
   } catch (error) {
      $toast.error(error.response.data.message, { position: "top" });
   }
}

const fetchCategories = async () => {
   try {
      const { data } = await axios.get('/admin/category');
      categories.value = data;
   } catch (error) {

   }
}

onMounted(() => {
   fetchCategories();
});

</script>

<style lang="scss" scoped></style>