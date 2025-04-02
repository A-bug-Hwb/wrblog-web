<template>
  <!--  侧边栏-->
  <v-navigation-drawer
      :width="!app.sidebar.hide?(app.sidebar.opened?220:58):220"
      :permanent="!app.sidebar.hide"
      :temporary="app.sidebar.hide"
      :model-value="app.sidebar.hide?app.sidebar.opened:true"
      @update:model-value="app.toggleSideBar()"
      elevation="1"
  >
    <!--        <v-divider></v-divider>-->
    <v-list nav>
      <template v-for="(item,index) in menus" :key="item.path">
        <div v-if="!item.hidden" @mouseenter="app.openSideBar()">
          <SideGroup :is-path="isPath" :item="item" v-if="item.children && item.alwaysShow"/>
          <SideItem :is-path="isPath" :item="item" v-else/>
        </div>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
<script setup lang="ts">
import SideGroup from "./SideGroup"
import SideItem from "./SideItem"
import permissionStore from "@/store/modules/permission";
import appStore from "@/store/modules/app";
import {ref, watch} from "vue";
import {useRoute} from "vue-router";

const permission = permissionStore()
const app = appStore()
const route = useRoute()
const menus = ref(permission.navigationBarRoutes);

const isPath = ref(route.path)
watch(() => [route.path],
    ([newPath], [oldPath]) => {
      isPath.value = newPath
      console.log(isPath.value)
    })
</script>
<style scoped>
</style>
