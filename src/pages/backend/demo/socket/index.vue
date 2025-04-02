<template>
  <div class="w-100 h-100">
    <div class="d-flex justify-lg-start flex-wrap" style="padding: 16px 0 0 16px">
      <v-text-field
        v-model="wsUrl"
        label="socket地址"
        hide-details="auto"
        class="mb-7"
        density="compact"
        variant="outlined"
        color="primary"
        max-width="500"
        min-width="150"
      ></v-text-field>
      <v-btn class="params-margin" :disabled="isConnect" :loading="socketLoading" text="连接" color="primary"
             @click="openConnect()"></v-btn>
      <v-btn class="params-margin" :disabled="!isConnect" @click="breakConnect()" text="断开连接"></v-btn>
    </div>
    <v-container fluid class="h-75">
      <v-row no-gutters class="fill-height">
        <v-col cols="5">
          <v-textarea
            class="fill-height"
            label="请输入要发送的内容"
            variant="outlined"
            auto-grow
            v-model="DataInfo.content.msg"
          >
          </v-textarea>
        </v-col>
        <v-col cols="2" class="d-flex flex-column justify-center align-center">
          <div class="d-flex justify-center" style="width: 100%">
            <v-text-field
              v-model="DataInfo.content.userId"
              label="目标用户id"
              class="mb-7"
              density="compact"
              variant="outlined"
              color="primary"
              max-width="200"
              min-width="80"></v-text-field>
          </div>
          <v-btn class="params-margin" text="发送" color="primary" @click="push()"></v-btn>
        </v-col>
        <v-col cols="5">
          <v-textarea
            class="fill-height"
            label="这里显示收到的内容"
            variant="outlined"
            auto-grow
            disabled
            v-model="receiveMsgList"
          >
          </v-textarea>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";
import authStore from '@/store/modules/auth'
import {useToast} from "vue-toastification";

const toast = useToast();
const wsUrl = ref("wss://api.wrblog.cn/api/v1/demo/socket/open")
const isConnect = ref(false)
const socket = ref()
const socketLoading = ref(false)
const auth = authStore()


const targetUserId = ref(auth.userId)

interface MsgInfoType {
  userId: string,
  type: string,
  msg: string,
}

interface DataInfoType {
  userId: string,
  type: string,
  content: MsgInfoType
}

const heartbeatData = ref<DataInfoType>({
  userId: auth.userId,
  type: "heartbeat",
  content: {
    userId: "",
    type: "string",
    msg: "",
  }
})

const DataInfo = ref<DataInfoType>({
  userId: auth.userId,
  type: "content",
  content: {
    userId: targetUserId.value,
    type: "msg",
    msg: "",
  }
})

const returnInfo = ref<DataInfoType>()

const receiveMsgList = ref([""])

function openConnect() {
  try {
    socketLoading.value = true
    socket.value = new WebSocket(wsUrl.value)
    heartbeat()
    receive()
    error()
    close()
  } catch (error: any) {
    socketLoading.value = false
    toast.error('Failed to create WebSocket: ', error)
    console.error('Failed to create WebSocket: ', error);
  }
}

//断开连接
function breakConnect() {
  socket.value.close()
}

//开始心跳防止长时间无动作导致掉线
function heartbeat() {
  socket.value.onopen = function () {
    socket.value.send(JSON.stringify(heartbeatData.value))
    socketLoading.value = false
    isConnect.value = true
    setInterval(() => {
      socket.value.send(JSON.stringify(heartbeatData.value))
    }, 1000 * 60)
  }
}

//发送数据
function push() {
  if (!isConnect.value) {
    toast.warning('请先上线！')
    return
  }
  if (DataInfo.value.content.msg.trim() != "") {
    socket.value.send(JSON.stringify(DataInfo.value))
  } else {
    toast.warning('请填写消息！')
  }
}

//接收数据
function receive() {
  socket.value.onmessage = function (e: any) {
    returnInfo.value = JSON.parse(e.data)
    if (returnInfo.value.type == "content") {
      receiveMsgList.value.push(returnInfo.value.content.msg + "\n")
    }
  }
}

//错误时触发
function error() {
  socket.value.onerror = function () {
    isConnect.value = false
    socketLoading.value = false
    toast.error('连接异常！')
  }
}

//连接断开时触发
function close() {
  socket.value.close = function () {
    isConnect.value = false
  }
}

openConnect()
</script>
<style scoped>

</style>
