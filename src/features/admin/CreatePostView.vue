<template>
   <div class="w-full">
      <div class="flex items-center justify-between w-full">
         <PageTitle class="mb-8">Yeni Yazı Ekle</PageTitle>
         <Button @click="onSubmit">Oluştur</Button>
      </div>

      <div class="w-full max-w-3xl">

         <Upload :profile-image="thumbnail" v-on:handle-change-files="handleChangeFiles"
            image-classes="w-[200px] h-[200px]" />

         <div class="grid grid-cols-2 gap-5 mb-5">
            <div class="flex flex-col items-start w-full">
               <label class="text-sm mb-1.5">Başlık</label>
               <input v-model="state.title" class="border outline-none w-full border-gray-200 p-2 rounded-md"
                  type="text" placeholder="" />
            </div>

            <CategorySelect v-on:get-category="handleCategory" :category="state.categoryId" />
         </div>


         <div class="flex flex-col items-start w-full mb-5">
            <label class="text-sm mb-1.5">Alt Başlık</label>
            <textarea rows="4" v-model="state.subtitle"
               class="border outline-none w-full border-gray-200 p-2 rounded-md" type="text" placeholder="" />
         </div>

         <div class="flex flex-col items-start w-full">
            <label class="text-sm mb-1.5">İçerik</label>
            <textarea rows="7" v-model="state.content" class="border outline-none w-full border-gray-200 p-2 rounded-md"
               type="text" placeholder="" />
         </div>


      </div>

   </div>
</template>

<script setup>
import { computed, reactive } from 'vue';
import PageTitle from '../../components/PageTitle.vue';
import CategorySelect from '../../components/CategorySelect.vue';
import Upload from '../../components/Upload.vue';
import Button from '../../components/Button.vue';
import { useToast } from 'vue-toast-notification';
import axios from '../../axios';
import { useRouter } from 'vue-router';

const $toast = useToast();
const router = useRouter();

const state = reactive({
   title: "",
   subtitle: "",
   content: "",
   categoryId: "",
   image: null
});


const onSubmit = async () => {
   const fd = new FormData();
   fd.append('title', state.title)
   fd.append('subtitle', state.subtitle)
   fd.append('content', state.content)
   fd.append('categoryId', state.categoryId)
   if (state.image != null) {
      fd.append('file', state.image)
   }

   try {
      const response = await axios.post('/admin/post', fd);
      router.push('/admin/posts');
      $toast.success(response.data.message, { position: "top" });
   } catch (error) {
      $toast.error(response.data.message, { position: "top" });
   }
}

const thumbnail = computed(() => {
   if (state.image == null) return null;
   return URL.createObjectURL(state.image);
});

const handleChangeFiles = (event) => {
   const files = event.target.files;
   if (!files.length) return;
   state.image = files[0];
}

const handleCategory = (category) => {
   state.categoryId = category;
}



</script>

<style lang="scss" scoped></style>