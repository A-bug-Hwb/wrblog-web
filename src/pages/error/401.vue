<template>
  <div class="errPage-container">
    <v-btn icon="arrow-left" class="pan-back-btn" @click="back()">
      返回
    </v-btn>
    <h1 class="text-jumbo text-ginormous">
      401错误!
    </h1>
    <h2>您没有访问权限！</h2>
    <h6>对不起，您没有访问权限，请不要进行非法操作！您可以返回主页面</h6>
    <ul class="list-unstyled">
      <v-btn variant="flat" color="primary" class="mt-4" to="/" prepend-icon="mdi-home"> Home</v-btn>
    </ul>
    <img src="@/assets/images/error/401.gif" width="313" height="428" alt="Girl has dropped her ice cream.">
  </div>
</template>

<script lang="ts" setup>

import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()

function back() {
  if (route.query.noGoBack) {
    router.push({path: '/index'})
  } else {
    router.go(-1)
  }
}
</script>

<style lang="scss" scoped>
.errPage-container {
  width: 800px;
  max-width: 100%;
  margin: 100px auto;

  .pan-back-btn {
    background: #008489;
    color: #fff;
    border: none !important;
  }

  .pan-gif {
    margin: 0 auto;
    display: block;
  }

  .pan-img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }

  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
  }

  .list-unstyled {
    font-size: 14px;
    margin-bottom: 20px;
    li {
      padding-bottom: 5px;
    }

    a {
      color: #008489;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
