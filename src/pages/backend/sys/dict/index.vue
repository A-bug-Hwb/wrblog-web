<template>
  <v-form ref="paramsRef" class="d-flex justify-lg-start flex-wrap" @submit.prevent="getPageList()">
    <v-text-field
        v-model="params.dictName"
        label="字典名称"
        hide-details="auto"
        class="params-margin"
        density="compact"
        variant="outlined"
        :color="setting.theme"
        max-width="220"
        min-width="150"
    ></v-text-field>
    <v-text-field
        v-model="params.dictType"
        label="字典类型"
        hide-details="auto"
        class="params-margin"
        density="compact"
        variant="outlined"
        :color="setting.theme"
        max-width="220"
        min-width="150"
    ></v-text-field>
    <v-select
        v-model="params.status"
        :items="sys_normal_disable"
        item-title="label"
        item-value="value"
        label="字典状态"
        hide-details="auto"
        class="params-margin"
        density="compact"
        variant="outlined"
        :color="setting.theme"
        max-width="220"
        min-width="150"
    ></v-select>
    <div class="d-flex justify-space-between">
      <v-btn class="params-margin" text="搜索" :color="setting.theme" type="submit"></v-btn>
      <v-btn text="重置" @click="resetParams()"></v-btn>
    </div>
  </v-form>
  <v-btn class="mt-4 params-margin" prepend-icon="mdi-plus" text="新增" :color="setting.theme" @click="add()"></v-btn>
  <v-btn class="mt-4 params-margin" prepend-icon="mdi-trash-can-outline" text="删除" :color="setting.errTheme"
         @click="remove(null)" :disabled="dictIds.length == 0"></v-btn>
  <v-btn class="mt-4 params-margin" prepend-icon="mdi-refresh" :loading="refreshLoading" text="刷新缓存"
         @click="handleRefreshCache()"
         :color="setting.errTheme"></v-btn>
  <v-card class="mt-4">
    <v-data-table-server
        :headers="headers"
        :items="dictTypeList"
        show-select
        density="comfortable"
        v-model="dictIds"
        :loading="tableLoading"
        item-value="dictId"
        :items-length="total">
      <template v-slot:[`item.dictType`]="info">
        <router-link :style="'text-decoration: none;color:'+ setting.theme"
                     :to="'/sys/dict-data/index/'+info.item.dictId">{{
            info.item.dictType
          }}
        </router-link>
      </template>
      <template v-slot:[`item.edit`]="info">
        <div class="d-flex justify-center">
          <v-icon icon="mdi-square-edit-outline" :color="setting.theme" @click="edit(info.item)"/>
          &nbsp&nbsp|&nbsp&nbsp
          <v-icon icon="mdi-trash-can-outline" :color="setting.errTheme" @click="remove(info.item)"/>
        </div>
      </template>
      <template v-slot:bottom>
        <v-divider></v-divider>
        <v-pagination v-if="total>0" size="small" v-model="params.pageNum" :length="Math.ceil(total/params.pageSize)"
                      @update:modelValue="getPageList()"></v-pagination>
      </template>
    </v-data-table-server>
  </v-card>
  <v-dialog style="width: 500px;" v-model="typeDialog">
    <v-card class="w-100" :title="formTitle">
      <template v-slot:append>
        <v-btn elevation="0" size="small" icon="mdi-close" @click="typeDialog = false"/>
      </template>
      <view-loading :loading="formLoading"></view-loading>
      <v-form ref="formRef" class="px-md-5" @submit.prevent="submitFrom()">
        <v-container>
          <v-row>
            <v-col class="d-flex justify-lg-start align-center pa-3">
              <v-list-subheader style="width: 80px">字典名称</v-list-subheader>
              <v-text-field
                  v-model="dictType.dictName"
                  :rules="typeRules.dictName"
                  label="字典名称"
                  hide-details="auto"
                  density="compact"
                  variant="outlined"
                  :color="setting.theme"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex justify-lg-start align-center pa-3">
              <v-list-subheader style="width: 80px">字典类型</v-list-subheader>
              <v-text-field
                  v-model="dictType.dictType"
                  :rules="typeRules.dictType"
                  label="字典类型"
                  hide-details="auto"
                  density="compact"
                  variant="outlined"
                  :color="setting.theme"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex justify-lg-start align-center pa-3">
              <v-list-subheader style="width: 80px">状态</v-list-subheader>
              <v-text-field
                  v-model="dictType.status"
                  label="状态"
                  hide-details="auto"
                  density="compact"
                  variant="outlined"
                  :color="setting.theme"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex justify-lg-start align-center pa-3">
              <v-list-subheader style="width: 80px">备注</v-list-subheader>
              <v-text-field
                  v-model="dictType.remark"
                  label="备注"
                  hide-details="auto"
                  density="compact"
                  variant="outlined"
                  :color="setting.theme"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <p class="pa-4 d-flex justify-lg-end">
          <v-btn text="提交" :color="setting.theme" type="submit" :loading="submitLoading"></v-btn>
          <v-btn style="margin-left: 15px" text="取消" @click="typeDialog = false"></v-btn>
        </p>
      </v-form>
    </v-card>
  </v-dialog>
  <confirm-dialog v-model:show="confirmShow" :text="confirmText" @submit="confirmSubmit()"></confirm-dialog>
</template>
<script setup lang="ts">
import ConfirmDialog from "@/components/ConfirmDialog"
import {
  ApiAddDictType,
  ApiDictTypeById,
  ApiDictTypePageList,
  ApiEditDictType,
  ApiRefreshCacheDict,
  ApiRemoveDictType
} from "@/api/sys/dict/type";
import settingsStore from "@/store/modules/settings";
import {useToast} from "vue-toastification";
import {reactive, ref} from "vue";
import ViewLoading from "@/components/ViewLoading/index.vue";
import dictStore from "@/store/modules/dict";
import {useDict} from "@/utils/dict";
import {tr} from "vuetify/locale";

const {sys_normal_disable} = useDict("sys_normal_disable")
const paramsRef = ref(null);
const formRef = ref(null);
const setting = settingsStore();
const tableLoading = ref(false)
const toast = useToast();
const refreshLoading = ref(false)
const headers = ref([
  {title: "字典编号", key: "dictId", align: "center", sortable: false},
  {title: "字典名称", key: "dictName", align: "center", sortable: false},
  {title: "字典类型", key: "dictType", align: "center", sortable: false},
  {title: "字典状态", key: "status", align: "center", sortable: false},
  {title: "备注", key: "remark", align: "center", sortable: false},
  {title: "创建时间", key: "createTime", align: "center", sortable: false},
  {title: "操作", key: "edit", align: "center", sortable: false}])
const typeDialog = ref(false)
const formTitle = ref("")
const formLoading = ref(false)
const submitLoading = ref(false)
const confirmShow = ref(false)
const confirmText = ref("")

const params = reactive({
  dictName: "",
  dictType: "",
  status: undefined,
  pageNum: 1,
  pageSize: 10
})

interface dictTypeType {
  dictId: number,
  dictName: string,
  dictType: string,
  status: string,
  remark: string,
}

const dictType = ref<dictTypeType>({
  dictId: 0,
  dictName: "",
  dictType: "",
  status: "0",
  remark: "",
})

const typeRules = {
  dictName: [(value: string) => {
    if (value) return true
    return '请填写字典名称！'
  },],
  dictType: [(value: string) => {
    if (value) return true
    return '请填写字典类型！'
  },]
}

const dictTypeList = ref<dictTypeType[]>()
const total = ref(0)
const dictIds = ref<number[]>([])

function resetParams() {
  (paramsRef.value as any).reset()
  getPageList()
}

function getPageList() {
  tableLoading.value = true
  ApiDictTypePageList(params).then((res: any) => {
    dictTypeList.value = res.rows
    total.value = res.total
  }).finally(() => {
    tableLoading.value = false
  })
}

function edit(item: any) {
  formLoading.value = true
  formTitle.value = "修改字典类型"
  typeDialog.value = true
  resetForm()
  ApiDictTypeById(item.dictId).then((res: any) => {
    dictType.value = res.data
  }).finally(() => {
    formLoading.value = false
  })
}

function add() {
  resetForm()
  formTitle.value = "添加字典类型"
  typeDialog.value = true
}

function submitFrom() {
  (formRef.value as any).validate().then((valid: any) => {
    if (valid.valid) {
      submitLoading.value = true
      if (dictType.value.dictId) {
        ApiEditDictType(dictType.value).then(() => {
          toast.success("提交成功！")
        }).finally(() => {
          submitLoading.value = false
          typeDialog.value = false
        })
      } else {
        ApiAddDictType(dictType.value).then(() => {
          toast.success("提交成功！")
        }).finally(() => {
          submitLoading.value = false
          typeDialog.value = false
        })
      }
    }
  })
}

function resetForm() {
  dictType.value = {
    dictId: 0,
    dictName: "",
    dictType: "",
    status: "0",
    remark: "",
  }
}

function confirmSubmit() {
  ApiRemoveDictType(dictIds.value.join(",")).then(() => {
    dictIds.value = []
    if (total.value % params.pageSize <= 1) {
      params.pageNum--
    }
    getPageList()
    toast.success("删除成功")
  })
}

function remove(item: any) {
  if (item) {
    dictIds.value = []
    dictIds.value.push(item.dictId)
  }
  confirmText.value = "是否确认删除字典编号为" + dictIds.value + "的数据项？"
  confirmShow.value = true
}

/** 刷新缓存按钮操作 */
function handleRefreshCache() {
  refreshLoading.value = true
  ApiRefreshCacheDict().then(() => {
    toast.success('刷新成功');
    dictStore().cleanDict();
  }).finally(() => {
    refreshLoading.value = false
  })
}

getPageList()
</script>
<style scoped>

</style>
