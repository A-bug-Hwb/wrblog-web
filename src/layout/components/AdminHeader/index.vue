<template>
  <!--  头部bar-->
  <v-app-bar :elevation="1">
    <template v-slot:prepend>
      <v-list>
        <v-list-item
          prepend-avatar="@/assets/images/logo/wr-logo.jpg"
          title="WrBlog 管理系统"
          @click="router.push('/backend')"
        ></v-list-item>
      </v-list>
    </template>
    <v-switch
      style="margin-right: 20px"
      false-icon="mdi-brightness-2"
      true-icon="mdi-brightness-6"
      v-model="sideTheme"
      @change="settings.switchTheme()"
      :color="sideTheme?'#FF6F00':''"
      hide-details
      inset
    ></v-switch>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-avatar class="avatar" :image="auth.avatar" v-bind="props"/>
      </template>
      <v-list density="compact" style="padding: 0;">
        <v-list-item variant="plain" value="个人中心" title="个人中心"/>
        <v-divider></v-divider>
        <v-list-item variant="plain" value="退出登录" title="退出登录" @click="logout()"/>
      </v-list>
    </v-menu>
    <v-icon class="avatar-icon" icon="mdi-menu-down"></v-icon>
  </v-app-bar>
</template>

<script setup lang="ts">
import {ref} from "vue";
import authStore from "@/store/modules/auth";
import settingsStore from "@/store/modules/settings";
import router from "@/router";

const auth = authStore()
const settings = settingsStore()
const sideTheme = ref(settings.sideTheme == 'light')

function logout() {
  auth.logout().then(() => {
    router.push("/login")
  })
}

</script>
<style scoped>
.avatar {
  cursor: pointer;
}

.avatar-icon {
  margin-left: -6px;
}
</style>
