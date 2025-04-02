<template>
  <v-layout class="h-100">
    <AdminHeader class="no-select-text"/>
    <SideBar class="no-select-text"/>
    <v-main class="h-100">
      <div class="d-flex justify-lg-start align-center">
        <v-breadcrumbs style="height: 48px" :items="[route.meta.title]">
          <template v-slot:prepend>
            <v-app-bar-nav-icon :icon="app.sidebar.opened?'mdi-menu-open':'mdi-menu-close'"
                                @click.stop="app.toggleSideBar()"></v-app-bar-nav-icon>
          </template>
        </v-breadcrumbs>
      </div>
      <div class="main-view">
        <router-view/>
      </div>
    </v-main>
  </v-layout>
</template>
<script setup lang="ts">
import AdminHeader from "../components/AdminHeader/index.vue"
import SideBar from "../components/SideBar/index.vue"
import appStore from "@/store/modules/app";
import {useRoute} from "vue-router";

const app = appStore()
const route = useRoute()

</script>
<style scoped>
.main-view {
  padding: 20px 20px;
  height: calc(100vh - 112px);
  box-sizing: border-box;
  overflow-y: auto;
}
</style>
