<template>
  <v-list-group
      :value="app.sidebar.opened?item.path:''"
  >
    <template v-slot:activator="{ props }">
      <v-list-item
          v-bind="props"
          color="primary"
          :title="item.meta.title"
          style="margin-inline-start: calc(4px + var(--indent-padding) / 2);padding-inline-start: 8px !important;"
      >
        <template v-slot:prepend>
          <v-icon size="small" :icon="item.meta.icon" class="icon-offset"></v-icon>
        </template>
      </v-list-item>
    </template>
    <template v-for="(itemIn,indexIn) in item.children" :key="itemIn.path">
      <div v-if="!itemIn.hidden">
        <SideGroup :is-path="isPath" :item="itemIn" v-if="itemIn.children && itemIn.alwaysShow"
                   :base-path="basePath+'/'+item.path"/>
        <SideItem :is-path="isPath" :item="itemIn" :base-path="basePath+'/'+item.path" v-else/>
      </div>
    </template>
  </v-list-group>
</template>
<script setup lang="ts">
import SideGroup from "../SideGroup";
import SideItem from "../SideItem";
import appStore from "@/store/modules/app";

const app = appStore()

const props = defineProps({
  item: {
    type: Object,
    default: {},
  },
  isPath: {
    type: String,
    default: '',
  },
  basePath: {
    type: String,
    default: '',
  },
})
</script>
<style scoped>

</style>
