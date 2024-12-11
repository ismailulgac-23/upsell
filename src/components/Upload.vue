<template>
   <input ref="imageRef" type="file" hidden @change="(event) => emit('handleChangeFiles', event)">
   <div @click="onPress"
      :class="['rounded-xl border-2 border-gray-200 border-dashed cursor-pointer select-none mb-5',imageClasses,{'h-[90px] w-[90px]': !imageClasses}]">
      <img v-if="profileImage" :src="profileImage" class="w-full h-full rounded-xl object-cover" />
      <div v-else class="flex flex-col items-center justify-center gap-1 h-full">
         <Icon icon="solar:upload-broken" class="text-gray-700 text-xl" />
         <h1 class="text-gray-700 text-sm">Yükle</h1>
      </div>
   </div>
</template>

<script setup>
import { Icon } from '@iconify/vue/dist/iconify.js';
import { ref } from 'vue';
const emit = defineEmits(['handleChangeFiles'])
defineProps(['profileImage','imageClasses'])

const imageRef = ref();

const onPress = () => {
   imageRef.value.click();
}
</script>

<style lang="scss" scoped></style>