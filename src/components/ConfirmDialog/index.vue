<template>
  <v-dialog style="width: 500px;" v-model="show">
    <v-card class="w-100" prepend-icon="mdi-alert-circle-outline" :title="title">
      <v-card-subtitle style="padding: 0 32px;">{{ text }}</v-card-subtitle>
      <p class="pa-4 d-flex justify-lg-end">
        <v-btn text="确定" :color="setting.theme" @click="submit()"></v-btn>
        <v-btn style="margin-left: 15px" text="取消" @click="show = false"></v-btn>
      </p>
      <template v-slot:append>
        <v-btn elevation="0" size="small" icon="mdi-close" @click="show = false"/>
      </template>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import settingsStore from "@/store/modules/settings";

const setting = settingsStore();
const show = defineModel("show", {type: Boolean, default: false})
const props = defineProps({
  title: {
    type: String,
    default: "系统提示",
  },
  text: {
    type: String,
    default: "确定要执行这个操作吗？",
  }
})

const emit = defineEmits(['submit'])

function submit() {
  show.value = false
  emit("submit")
}

</script>
<style scoped>

</style>
