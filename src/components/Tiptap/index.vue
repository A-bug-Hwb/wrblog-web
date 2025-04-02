<template>
    <VuetifyTiptap v-model="content" :min-height="height" :max-height="height" label="富文本编辑器" :max-width="1000"
                   :extensions="extensions" @change="change()">
    </VuetifyTiptap>
</template>
<script setup lang="ts">
import {
  BaseKit,
  VuetifyTiptap,
} from 'vuetify-pro-tiptap'
import 'vuetify-pro-tiptap/style.css'
import {ref} from "vue";

const extensions = [
  BaseKit.configure({
    placeholder: {
      placeholder: '请输入内容...'
    }
  }),
]
const height = ref(document.documentElement.clientHeight - 300 + 'px');

const content = ref("")

function change(){
  console.log(content.value)
}
</script>
