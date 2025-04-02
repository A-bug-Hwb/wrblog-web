<template>
  <v-overlay class="d-flex justify-center align-center" v-model="props.loading" :theme="setting.sideTheme == 'light'?'dark':'light'" opacity="0.9" persistent contained>
    <v-progress-circular
        :color="setting.theme"
        indeterminate
    ></v-progress-circular>
  </v-overlay>
</template>
<script setup lang="ts">
import settingsStore from "@/store/modules/settings"

const setting = settingsStore()

const props = defineProps({
  loading:{
    type: Boolean,
    default:false,
  }
})
</script>
<style scoped>

</style>
