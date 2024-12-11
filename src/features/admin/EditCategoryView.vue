<template>
   <div class="w-full">
      <div class="flex items-center justify-between w-full">
         <PageTitle class="mb-8">Kategori Güncelle</PageTitle>
         <Button @click="onSubmit">Kaydet</Button>
      </div>

      <div class="w-full max-w-3xl">

         <div class="flex flex-col items-start w-full">
            <label class="text-sm mb-1.5">Kategori Adı</label>
            <input v-model="state.title" class="border outline-none w-full border-gray-200 p-2 rounded-md" type="text"
               placeholder="" />
         </div>
      </div>

   </div>
</template>

<script setup>
import { computed, onMounted, reactive } from 'vue';
import PageTitle from '../../components/PageTitle.vue';
import Button from '../../components/Button.vue';
import { useToast } from 'vue-toast-notification';
import axios from '../../axios';
import { useRoute, useRouter } from 'vue-router';

const $toast = useToast();
const router = useRouter();
const route = useRoute();

const state = reactive({
   title: "",
});


const onSubmit = async () => {
   try {
      const response = await axios.patch(`/admin/category/${route.params.id}`, state);
      router.push('/admin/categories');
      $toast.success(response.data.message, { position: "top" });
   } catch (error) {
      $toast.error(error.response.data.message, { position: "top" });
   }
}
const fetchCategory = async () => {
   try {
      const id = route.params.id
      const { data } = await axios.get(`/admin/category/${id}`);
      Object.assign(state, {
         title: data.title,
      });
   } catch (error) {
      $toast.error(error.response.data.message, { position: "top" });
   }
}

onMounted(() => {
   fetchCategory();
});


</script>

<style lang="scss" scoped></style>