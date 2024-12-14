<template>
   <div class="w-full">
      <Navbar />
      <Stories />
      <CreatePost />
      <Posts />
   </div>
</template>

<script setup>
import Stories from "../../components/common/Stories/index.vue";
import CreatePost from "../../components/common/CreatePost/index.vue";
import Posts from "../../components/common/Posts/index.vue";
import Navbar from "../../layouts/Root/Navbar.vue";

</script>

<style lang="scss" scoped></style>