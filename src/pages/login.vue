<template>
  <div class="login-body d-flex align-center justify-center">
    <v-card class="login-card d-flex flex-column align-center justify-center">
      <img class="login-logo" src="@/assets/images/logo/wr-logo.jpg" alt="wrblog-logo"/>
      <v-form ref="loginFormRef" class="login-form" @submit.prevent="handleLogin">
        <v-text-field
            prepend-inner-icon="mdi-account-outline"
            v-model="loginForm.ak"
            :rules="loginRulesUk.ak"
            :label="akText"
            class="mb-7"
            required
            density="comfortable"
            hide-details="auto"
            variant="outlined"
            color="primary"
        ></v-text-field>
        <v-text-field
            prepend-inner-icon="mdi-lock-outline"
            v-model="pwd"
            :rules="loginRulesUk.pwd"
            label="密码"
            class="mb-7"
            required
            density="comfortable"
            variant="outlined"
            color="primary"
            hide-details="auto"
            :append-inner-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPwd ? 'text' : 'password'"
            @click:append-inner="showPwd = !showPwd"
        ></v-text-field>
        <v-text-field
            v-if="codeInfo.isVerify"
            v-model="loginForm.ck"
            :rules="loginRulesUk.ck"
            label="验证码"
            class="mb-7"
            required
            density="comfortable"
            variant="outlined"
            color="primary"
            hide-details="auto"
        ></v-text-field>
        <v-btn color="deep-purple" :loading="loginLoading" block class="mt-2" text="登录" :disabled="loginLoading"
               type="submit"></v-btn>
      </v-form>
      <div class="login-register d-flex align-center justify-space-between">
        <p>没有账号？</p>
        <router-link to="/register">立即注册</router-link>
      </div>
      <div class="login-or-row d-flex align-center">
        <v-divider/>
        <v-btn variant="outlined" class="or-btn" rounded="md" size="small">OR</v-btn>
        <v-divider/>
      </div>
      <div class="login-or-icon d-flex align-center justify-space-evenly">
        <img class="login-type-icon" v-show="loginForm.lt !== '1'" src="@/assets/images/icon/icon-account.png"
             alt="账号登录"
             @click="loginForm.lt = '1'">
        <img class="login-type-icon" v-show="loginForm.lt !== '2'" src="@/assets/images/icon/icon-mobile.png"
             alt="手机验证登录" @click="loginForm.lt = '2'">
        <img class="login-type-icon" v-show="loginForm.lt !== '3'" src="@/assets/images/icon/icon-mailbox.png"
             alt="邮箱验证登录" @click="loginForm.lt = '3'">
        <!--        <img class="login-type-icon" v-show="loginForm.lt !== '4'" src="@/assets/images/icon/icon-wechat.png"-->
        <!--             alt="微信授权登录" @click="getWxWebCode()">-->
        <img class="login-type-icon" src="@/assets/images/icon/icon-other.png" alt="更多方式" @click="moreLogin()">
      </div>
    </v-card>
  </div>
</template>
<script setup name="Login" lang="ts">
import {reactive, ref, watch} from "vue";
import {ApiCodeImage, ApiPublicKey} from "@/api/auth/auth";
import {encrypt} from "@/utils/jsencrypt";
import {useRouter, useRoute} from "vue-router";
import authStore from "@/store/modules/auth";

const auth = authStore()
const redirect = ref("");
const akText = ref("账号 / 手机 / 邮箱")
const loginLoading = ref(false)
const showPwd = ref(false);
const loginFormRef = ref(null);
const pwd = ref("");
const router = useRouter();
const route = useRoute();

const loginForm = reactive({
  ak: "",
  lt: "1",
  rkId: "",
  pk: "",
  ckId: "",
  ck: "",
})

const codeInfo = reactive({
  ckId: "",
  image: "",
  isVerify: false
})

const loginRulesUk = {
  ak: [(value: string) => {
    if (value) return true
    return '请填写账号！'
  },],
  pwd: [(value: string) => {
    if (value) return true
    return '请填写密码！'
  },],
  ck: [(value: string) => {
    if (value) return true
    return '请填写验证码！'
  },],
}

watch(route, (newRoute) => {
  redirect.value = <string>newRoute.query.redirect;
}, {immediate: true});


function getCode() {
  ApiCodeImage().then((res: any) => {
    codeInfo.ckId = res.data.ckId
    codeInfo.image = res.data.image
    codeInfo.isVerify = res.data.isVerify
  })
}

//登录方法
function handleLogin() {
  (loginFormRef.value as any).validate().then((valid: any) => {
        if (valid.valid) {
          loginLoading.value = true
          loginKey()
        }
      }
  )
}

function login() {
  auth.login(loginForm).then((res: any) => {
    console.log(res)
  })
}

async function loginKey() {
  let publicKey = await getPublicKey()
  loginForm.pk = encrypt(pwd.value, publicKey)
  auth.loginKey(loginForm).then((res: any) => {
    if (res.code == 200) {
      router.push({path: redirect.value || "/home"});
    }
  }).finally(() => {
    loginLoading.value = false
  })
}

async function getPublicKey() {
  let publicKey = ""
  await ApiPublicKey().then(res => {
    loginForm.rkId = res.data.rkId
    publicKey = res.data.publicKey
  })
  return publicKey
}

function moreLogin() {
  alert("其他还没集成呢！")
}

getCode()

</script>


<style scoped>
.login-body {
  width: 100vw;
  height: 100vh;
  background-image: url("@/assets/images/log-reg-background.png");
  background-size: cover;
  background-position: center;

  .login-card {
    width: 450px;
    height: 528px;
    padding: 36px;
    box-sizing: border-box;
    border-radius: 12px;

    .login-logo {
      width: 90px;
      height: 90px;
      margin-bottom: 20px;
    }

    .login-form {
      width: 100%;
    }

    .login-register {
      width: 100%;
      font-size: 14px;
      height: 50px
    }

    .login-or-row {
      width: 100%;

      .or-btn {
        padding: 2px 40px;
        border-color: rgba(0, 0, 0, 0.08);
        border-radius: 50px;
      }
    }

    .login-or-icon {
      width: 90%;
      margin-top: 30px;

      .login-type-icon {
        cursor: pointer;
        width: 34px;
        height: 34px;
      }
    }
  }
}

</style>
