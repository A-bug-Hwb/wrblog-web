<template>
  <v-app :theme="sideTheme">
    <v-main>
      <loading-dialog></loading-dialog>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import LoadingDialog from "@/components/LoadingDialog/index.vue";
import {onMounted, ref, watch} from "vue";
import settingsStore from "@/store/modules/settings";
import appStore from "@/store/modules/app";

const settings = settingsStore()
const app = appStore()
const sideTheme = ref(settings.sideTheme)

const device = ref(app.device)

watch(() => [settings.sideTheme],
    ([newSideTheme], [oldSideTheme]) => {
      sideTheme.value = newSideTheme
    })

onMounted(() => {
  // 第一次加载数据
  // 增加window监听
  window.addEventListener('resize', () => {
    initApp()
  })
})

function initApp() {
  if (window?.innerWidth > 1024) {
    device.value = "desktop"
    app.sidebar.hide = false
  } else {
    device.value = "move"
    app.sidebar.hide = true
  }
  app.toggleDevice(device.value)
}

initApp()
</script>
<style></style>
