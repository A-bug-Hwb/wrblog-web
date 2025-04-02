<template>
  <v-dialog
      v-model="isShow"
      max-width="320"
      persistent
  >
    <v-list
        class="py-2"
        :color="color"
        elevation="12"
        rounded="lg"
    >
      <img style="width: 30px;height: 30px;position: absolute;top: 17px;left: 20px"
           src="@/assets/images/logo/wr-logo.jpg" alt="logo">
      <v-list-item
          :title="text"
      >
        <template v-slot:prepend>
          <div class="pe-4">
            <v-icon :color="color" size="x-large"></v-icon>
          </div>
        </template>

        <template v-slot:append>
          <v-progress-circular
              :color="color"
              indeterminate="disable-shrink"
              size="16"
              width="2"
          ></v-progress-circular>
        </template>
      </v-list-item>
    </v-list>
  </v-dialog>
</template>
<script setup lang="ts">
import {ref, watch} from 'vue';
import loadingDialogStore from '@/store/modules/loadingDialog'

const loadingDialog = loadingDialogStore()
const isShow = ref(loadingDialog.isShow);
const color = ref(loadingDialog.color);
const text = ref(loadingDialog.text);
watch(() => [loadingDialog.isShow, loadingDialog.text, loadingDialog.color],
    ([newIsShow, newText, newColor], [oldIsShow, oldText, oldColor]) => {
      isShow.value = newIsShow
      text.value = newText
      color.value = newColor
    })
</script>
<style scoped>

</style>
