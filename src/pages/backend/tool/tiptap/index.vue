<template>
  <div class="h-100 d-flex justify-center">
    <v-tiptap class="v-tiptap" v-model="content"/>
  </div>
</template>
<script setup lang="ts">
import VTiptap from "@/components/Tiptap"
import {ref} from "vue";

const content = ref("hello......")
</script>
<style scoped>
.v-tiptap {
  width: 1200px;
  overflow-y: auto;
}
</style>
