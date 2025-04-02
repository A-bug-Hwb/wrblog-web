<template>
  <div class="register-body d-flex align-center justify-center">
    <v-card class="register-card d-flex flex-column align-center justify-center">
      <img class="register-logo" src="@/assets/images/logo/wr-logo.jpg" alt="wrblog-logo"/>
      <v-form ref="registerFormRef" class="register-form" @submit.prevent="handleRegister">
        <v-text-field
            prepend-inner-icon="mdi-account-outline"
            v-model="registerForm.uk"
            :rules="registerRulesUk.uk"
            label="账号"
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
            :rules="registerRulesUk.pwd"
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
            prepend-inner-icon="mdi-lock-outline"
            v-model="confirmPwd"
            :rules="registerRulesUk.confirmPwd"
            label="确认密码"
            class="mb-7"
            required
            density="comfortable"
            variant="outlined"
            color="primary"
            hide-details="auto"
            :append-inner-icon="showCPwd ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showCPwd ? 'text' : 'password'"
            @click:append-inner="showCPwd = !showCPwd"
        ></v-text-field>
        <v-btn color="deep-purple" :loading="registerLoading" block class="mt-2" :text="registerText"
               :disabled="true"
               type="submit"></v-btn>
      </v-form>
      <div class="register-login d-flex align-center justify-space-between">
        <p>已有账号？</p>
        <router-link to="/login">立即登录</router-link>
      </div>
    </v-card>
  </div>
</template>
<script setup name="Register" lang="ts">
import {reactive, ref} from "vue";
import {ApiRegister, ApiRegisterKey, ApiPublicKey} from "@/api/auth/auth";
import {encrypt} from "@/utils/jsencrypt";

const registerLoading = ref(false)
const registerText = ref("未开启注册功能")
const showPwd = ref(false);
const showCPwd = ref(false);
const registerFormRef = ref(null);
const pwd = ref("wenbin129");
const confirmPwd = ref("wenbin129");
const registerForm = reactive({
  uk: "hwb",
  rkId: "",
  pk: "",
  mobile: "",
  cpk: "",
  ckId: "",
  ck: "",
})

const registerRulesUk = {
  uk: [(value: string) => {
    if (value) return true
    return '请填写账号！'
  },],
  pwd: [(value: string) => {
    if (value) return true
    return '请填写密码！'
  },],
  confirmPwd: [(value: string) => {
    if (value) return true
    return '请填写确认密码！'
  },],
  ck: [(value: string) => {
    if (value) return true
    return '请填写验证码！'
  },],
}

//登录方法
function handleRegister() {
  (registerFormRef.value as any).validate().then((valid: any) => {
        if (valid.valid) {
          registerLoading.value = true
          registerKey()
        }
      }
  )
}

function register() {
  ApiRegister(registerForm).then(res => {
    console.log(res)
  })
}

async function registerKey() {
  let publicKey = await getPublicKey()
  registerForm.pk = encrypt(pwd.value, publicKey)
  registerForm.cpk = encrypt(confirmPwd.value, publicKey)
  ApiRegisterKey(registerForm).then((res: any) => {
    if (res.code == 200) {
      console.log("成功")
    }
    console.log(res)
  }).finally(() => {
    registerLoading.value = false
  })
}

async function getPublicKey() {
  let publicKey = ""
  await ApiPublicKey().then(res => {
    registerForm.rkId = res.data.rkId
    publicKey = res.data.publicKey
  })
  return publicKey
}
</script>


<style scoped>
.register-body {
  width: 100vw;
  height: 100vh;
  background-image: url("@/assets/images/log-reg-background.png");
  background-size: cover;
  background-position: center;

  .register-card {
    width: 450px;
    height: 528px;
    padding: 36px;
    box-sizing: border-box;
    border-radius: 12px;

    .register-logo {
      width: 90px;
      height: 90px;
      margin-bottom: 20px;
    }

    .register-form {
      width: 100%;
    }

    .register-login {
      width: 100%;
      font-size: 14px;
      height: 50px
    }

    .register-or-row {
      width: 100%;

      .or-btn {
        padding: 2px 40px;
        border-color: rgba(0, 0, 0, 0.08);
        border-radius: 50px;
      }
    }

    .register-or-icon {
      width: 90%;

      .register-type-icon {
        cursor: pointer;
        width: 34px;
        height: 34px;
      }
    }
  }
}

</style>
