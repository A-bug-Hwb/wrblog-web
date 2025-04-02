<template>
  <v-form ref="paramsRef" class="d-flex justify-lg-start flex-wrap" @submit.prevent="getPageList()">
    <v-select
        v-model="params.dictType"
        :items="dictTypeList"
        item-title="dictName"
        item-value="dictType"
        label="字典名称"
        closable-chips
        class="params-margin"
        density="compact"
        variant="outlined"
        :color="setting.theme"
        max-width="220"
        min-width="150"
    ></v-select>
    <v-text-field
        v-model="params.dictLabel"
        label="字典标签"
        class="params-margin"
        density="compact"
        variant="outlined"
        :color="setting.theme"
        max-width="220"
        min-width="150"
    ></v-text-field>
    <v-text-field
        v-model="params.status"
        label="字典状态"
        class="params-margin"
        density="compact"
        variant="outlined"
        :color="setting.theme"
        max-width="220"
        min-width="150"
    ></v-text-field>
    <div class="d-flex justify-space-between">
      <v-btn class="params-margin" text="搜索" :color="setting.theme" type="submit"></v-btn>
      <v-btn text="重置" @click="resetParams()"></v-btn>
    </div>
  </v-form>
  <v-btn class="mt-4 params-margin" prepend-icon="mdi-plus" text="新增" :color="setting.theme" @click="add()"></v-btn>
  <v-btn class="mt-4 params-margin" prepend-icon="mdi-trash-can-outline" text="删除" :color="setting.errTheme"
         @click="remove(null)" :disabled="dictCodes.length == 0"></v-btn>
  <v-card class="mt-4">
    <v-data-table-server
        :headers="headers"
        :items="dictDataList"
        show-select
        density="comfortable"
        v-model="dictCodes"
        :loading="tableLoading"
        item-value="dictCode"
        :items-length="total">
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
  <v-dialog style="width: 700px;" v-model="dataDialog">
    <v-card class="w-100" :title="formTitle">
      <template v-slot:append>
        <v-btn elevation="0" size="small" icon="mdi-close" @click="dataDialog = false"/>
      </template>
      <view-loading :loading="formLoading"></view-loading>
      <v-form ref="formRef" class="px-md-5" @submit.prevent="submitFrom()">
        <v-container>
          <v-row>
            <v-col class="d-flex justify-lg-start align-center pa-3">
              <v-list-subheader style="width: 80px">字典类型</v-list-subheader>
              <v-text-field
                  v-model="dictData.dictType"
                  label="字典类型"
                  hide-details="auto"
                  density="compact"
                  variant="outlined"
                  :color="setting.theme"
                  disabled
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex justify-lg-start align-center pa-3">
              <v-list-subheader style="width: 80px">数据标签</v-list-subheader>
              <v-text-field
                  v-model="dictData.dictLabel"
                  :rules="dataRules.dictLabel"
                  label="数据标签"
                  hide-details="auto"
                  density="compact"
                  variant="outlined"
                  :color="setting.theme"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex justify-lg-start align-center pa-3">
              <v-list-subheader style="width: 80px">样式属性</v-list-subheader>
              <v-text-field
                  v-model="dictData.cssClass"
                  label="样式属性"
                  hide-details="auto"
                  density="compact"
                  variant="outlined"
                  :color="setting.theme"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex justify-lg-start align-center pa-3">
              <v-list-subheader style="width: 80px">回显样式</v-list-subheader>
              <v-text-field
                  v-model="dictData.listClass"
                  label="回显样式"
                  hide-details="auto"
                  density="compact"
                  variant="outlined"
                  :color="setting.theme"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" class="d-flex justify-lg-start align-center pa-3">
              <v-list-subheader style="width: 80px">显示排序</v-list-subheader>
              <v-text-field
                  v-model="dictData.dictSort"
                  :rules="dataRules.dictSort"
                  label="状态"
                  type="number"
                  hide-details="auto"
                  density="compact"
                  variant="outlined"
                  :color="setting.theme"
              ></v-text-field>
            </v-col>
            <v-col cols="6" class="d-flex justify-lg-start align-center pa-3">
              <v-list-subheader style="width: 80px">状态</v-list-subheader>
              <v-text-field
                  v-model="dictData.status"
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
                  v-model="dictData.remark"
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
          <v-btn style="margin-left: 15px" text="取消" @click="dataDialog = false"></v-btn>
        </p>
      </v-form>
    </v-card>
  </v-dialog>
  <confirm-dialog v-model:show="confirmShow" :text="confirmText" @submit="confirmSubmit()"></confirm-dialog>
</template>
<script setup lang="ts">
import {reactive, ref} from "vue";
import settingsStore from "@/store/modules/settings";
import {useToast} from "vue-toastification";
import {
  ApiAddDictData,
  ApiDictDataById,
  ApiDictDataPageList,
  ApiEditDictData,
  ApiRemoveDictData
} from "@/api/sys/dict/data";
import {ApiDictTypePageList, ApiRemoveDictType,} from "@/api/sys/dict/type";
import ConfirmDialog from "@/components/ConfirmDialog/index.vue";
import ViewLoading from "@/components/ViewLoading/index.vue";

const paramsRef = ref(null);
const formRef = ref(null);
const setting = settingsStore();
const tableLoading = ref(false)
const toast = useToast();
const headers = ref([
  {title: "字典编号", key: "dictCode", align: "center", sortable: false},
  {title: "字典标签", key: "dictLabel", align: "center", sortable: false},
  {title: "字典键值", key: "dictSort", align: "center", sortable: false},
  {title: "字典排序", key: "status", align: "center", sortable: false},
  {title: "状态", key: "status", align: "center", sortable: false},
  {title: "备注", key: "remark", align: "center", sortable: false},
  {title: "创建时间", key: "createTime", align: "center", sortable: false},
  {title: "操作", key: "edit", align: "center", sortable: false}])

const dataDialog = ref(false)
const formTitle = ref("")
const formLoading = ref(false)
const submitLoading = ref(false)
const confirmShow = ref(false)
const confirmText = ref("")

const params = reactive({
  dictType: undefined,
  dictLabel: "",
  status: "",
  pageNum: 1,
  pageSize: 10
})

interface dictDataType {
  dictCode: number,
  dictSort: number,
  dictLabel: string,
  dictValue: string,
  dictType: string,
  cssClass: string,
  listClass: string,
  isDefault: string,
  status: string,
  remark: string,
}

const dictData = ref<dictDataType>({
  dictCode: 0,
  dictSort: 0,
  dictLabel: "",
  dictValue: "",
  dictType: "",
  cssClass: "",
  listClass: "",
  isDefault: "",
  status: "0",
  remark: "",
})

const dataRules = {
  dictLabel: [(value: string) => {
    if (value) return true
    return '请填写数据标签！'
  },],
  dictValue: [(value: string) => {
    if (value) return true
    return '请填写数据键值！'
  },],
  dictSort: [(value: string) => {
    if (value) return true
    return '请填写字典排序！'
  },]
}


const dictTypeList = ref()
const dictDataList = ref<dictDataType[]>()
const total = ref(0)
const dictCodes = ref<number[]>([])

function resetParams() {
  (paramsRef.value as any).reset()
  params.dictType = dictTypeList.value[0].dictType
  getPageList()
}

function getTypePageList() {
  tableLoading.value = true
  ApiDictTypePageList({pageNum: 1, pageSize: -1}).then((res: any) => {
    dictTypeList.value = res.rows
    params.dictType = dictTypeList.value[0].dictType
  }).finally(() => {
    tableLoading.value = false
    getPageList()
  })
}

function getPageList() {
  tableLoading.value = true
  ApiDictDataPageList(params).then((res: any) => {
    dictDataList.value = res.rows
    total.value = res.total
  }).finally(() => {
    tableLoading.value = false
  })
}

function edit(item: any) {
  formLoading.value = true
  formTitle.value = "修改字典数据"
  dataDialog.value = true
  resetForm()
  ApiDictDataById(item.dictCode).then((res: any) => {
    dictData.value = res.data
  }).finally(() => {
    formLoading.value = false
  })
}

function add() {
  resetForm()
  formTitle.value = "添加字典数据"
  dataDialog.value = true
}

function submitFrom() {
  (formRef.value as any).validate().then((valid: any) => {
    if (valid.valid) {
      submitLoading.value = true
      if (dictData.value.dictCode) {
        ApiEditDictData(dictData.value).then(() => {
          toast.success("提交成功！")
        }).finally(() => {
          submitLoading.value = false
          dataDialog.value = false
        })
      } else {
        ApiAddDictData(dictData.value).then(() => {
          toast.success("提交成功！")
        }).finally(() => {
          submitLoading.value = false
          dataDialog.value = false
        })
      }
    }
  })
}

function resetForm() {
  dictData.value = {
    dictCode: 0,
    dictSort: 0,
    dictLabel: "",
    dictValue: "",
    dictType: "",
    cssClass: "",
    listClass: "",
    isDefault: "",
    status: "0",
    remark: "",
  }
}

function confirmSubmit() {
  ApiRemoveDictData(dictCodes.value.join(",")).then(() => {
    dictCodes.value = []
    if (total.value % params.pageSize <= 1) {
      params.pageNum--
    }
    getPageList()
    toast.success("删除成功")
  })
}

function remove(item: any) {
  if (item) {
    dictCodes.value = []
    dictCodes.value.push(item.dictCode)
  }
  confirmText.value = "是否确认删除字典编号为" + dictCodes.value + "的数据项？"
  confirmShow.value = true
}

getTypePageList()
</script>
<style scoped>
</style>
