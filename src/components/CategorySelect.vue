<template>
   <div class="flex flex-col items-start w-full">
      <label class="text-sm mb-1.5">Kategori</label>
      <select class="border outline-none w-full border-gray-200 p-2 rounded-md h-[42px]" @change="(event) => emit('get-category',event.target.value)" :value="category">
         <option value="" selected disabled>Kategori Seç</option>
         <option v-for="(category, index) in categories" :key="index" :value="category.id">{{ category.title }}</option>
      </select>
   </div>
</template>

<script setup>

import { onMounted, ref } from 'vue';
import axios from '../axios';

defineProps(['category'])
const emit = defineEmits(['get-category'])

const categories = ref([]);

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