<template>
  <v-form ref="paramsRef" class="d-flex justify-lg-start flex-wrap" @submit.prevent="getSysMenuTree()">
    <v-text-field
        v-model="params.menuName"
        label="菜单名称"
        hide-details="auto"
        class="params-margin"
        density="compact"
        variant="outlined"
        :color="setting.theme"
        max-width="220"
        min-width="150"
    ></v-text-field>
    <v-text-field
        v-model="params.status"
        label="菜单状态"
        hide-details="auto"
        class="params-margin"
        density="compact"
        variant="outlined"
        :color="setting.theme"
        max-width="220"
        min-width="150"
    ></v-text-field>
    <div class="d-flex justify-space-between">
      <v-btn class="params-margin" text="搜索" :color="setting.theme" type="submit"></v-btn>
      <v-btn class="params-margin" text="重置" @click="resetParams()"></v-btn>
    </div>
  </v-form>
  <v-btn class="mt-4" prepend-icon="mdi-plus" text="新增" :color="setting.theme" @click="add(0)"></v-btn>
  <v-card class="mt-4">
    <v-btn class="btn-open" size="x-small" :icon="isExpand?'mdi-chevron-down':'mdi-chevron-up'"
           @click="isExpand = !isExpand"></v-btn>
    <v-table density="compact" style="padding: 0 14px 0 58px">
      <thead>
      <tr>
        <th class="text-center tr-th" v-for="(item,index) in headers" :key="item">
          {{ item }}
        </th>
      </tr>
      </thead>
    </v-table>
    <v-treeview :items="sysMenuTree" item-value="menuId" :open-all="isExpand">
      <template v-slot:title="{item}">
        <v-table density="compact">
          <tbody>
          <tr>
            <td class="text-center tr-td">{{ item.menuName }}</td>
            <td class="text-center tr-td">{{ item.path }}</td>
            <td class="text-center tr-td">{{ item.orderNum }}</td>
            <td class="text-center tr-td">{{ item.menuType }}</td>
            <td class="text-center tr-td">{{ item.status }}</td>
            <td class="text-center tr-td">
              <v-icon :icon="item.icon"></v-icon>
            </td>
            <td class="text-center tr-td justify-center">
              <div class="d-flex justify-center">
                <v-icon icon="mdi-square-edit-outline" :color="setting.theme" @click="edit(item)"/>
                &nbsp&nbsp|&nbsp&nbsp
                <v-icon icon="mdi-plus-circle-outline" :color="setting.theme" @click="add(item.menuId)"/>
                &nbsp&nbsp|&nbsp&nbsp
                <v-icon icon="mdi-trash-can-outline" :color="setting.errTheme" @click="remove(item)"/>
              </div>
            </td>
          </tr>
          </tbody>
        </v-table>
        <v-divider></v-divider>
      </template>
    </v-treeview>
  </v-card>
  <v-dialog style="width: 800px;" v-model="menuDialog">
    <v-card class="w-100" :title="formTitle">
      <template v-slot:append>
        <v-btn elevation="0" size="small" icon="mdi-close" @click="menuDialog = false"/>
      </template>
      <view-loading :loading="formLoading"></view-loading>
      <v-form ref="formRef" class="px-md-5" @submit.prevent="submitFrom()">
        <v-container>
          <v-row>
            <v-col class="d-flex justify-lg-start align-center pa-3">
              <v-list-subheader>上级菜单</v-list-subheader>
              <v-text-field
                  v-model="sysMenu.parentId"
                  :rules="menuRules.parentId"
                  label="上级菜单"
                  type="number"
                  hide-details="auto"
                  density="compact"
                  variant="outlined"
                  :color="setting.theme"
                  clearable
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex justify-lg-start align-center pa-3">
              <v-list-subheader>菜单图标</v-list-subheader>
              <v-text-field
                  v-model="sysMenu.icon"
                  label="菜单图标"
                  hide-details="auto"
                  density="compact"
                  variant="outlined"
                  :color="setting.theme"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" class="d-flex justify-lg-start align-center pa-3">
              <v-list-subheader>菜单名称</v-list-subheader>
              <v-text-field
                  v-model="sysMenu.menuName"
                  :rules="menuRules.menuName"
                  label="菜单名称"
                  hide-details="auto"
                  density="compact"
                  variant="outlined"
                  :color="setting.theme"
                  clearable
              ></v-text-field>
            </v-col>
            <v-col cols="6" class="d-flex justify-lg-start align-center pa-3">
              <v-list-subheader>显示排序</v-list-subheader>
              <v-text-field
                  v-model="sysMenu.orderNum"
                  label="显示排序"
                  type="number"
                  hide-details="auto"
                  density="compact"
                  variant="outlined"
                  :color="setting.theme"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" class="d-flex justify-lg-start align-center pa-3">
              <v-list-subheader>菜单类型</v-list-subheader>
              <v-text-field
                  v-model="sysMenu.menuType"
                  label="菜单类型"
                  hide-details="auto"
                  density="compact"
                  variant="outlined"
                  :color="setting.theme"
              ></v-text-field>
            </v-col>
            <v-col cols="6" class="d-flex justify-lg-start align-center pa-3">
              <v-list-subheader>菜单状态</v-list-subheader>
              <v-text-field
                  v-model="sysMenu.orderNum"
                  label="菜单状态"
                  hide-details="auto"
                  density="compact"
                  variant="outlined"
                  :color="setting.theme"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" class="d-flex justify-lg-start align-center pa-3">
              <v-list-subheader>是否外链</v-list-subheader>
              <v-text-field
                  v-model="sysMenu.isFrame"
                  label="是否外链"
                  hide-details="auto"
                  density="compact"
                  variant="outlined"
                  :color="setting.theme"
                  clearable
              ></v-text-field>
            </v-col>
            <v-col cols="6" class="d-flex justify-lg-start align-center pa-3">
              <v-list-subheader>路由地址</v-list-subheader>
              <v-text-field
                  v-model="sysMenu.path"
                  :rules="menuRules.path"
                  label="路由地址"
                  hide-details="auto"
                  density="compact"
                  variant="outlined"
                  :color="setting.theme"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" class="d-flex justify-lg-start align-center pa-3">
              <v-list-subheader>组件路径</v-list-subheader>
              <v-text-field
                  v-model="sysMenu.component"
                  label="组件路径"
                  hide-details="auto"
                  density="compact"
                  variant="outlined"
                  :color="setting.theme"
                  clearable
              ></v-text-field>
            </v-col>
            <v-col cols="6" class="d-flex justify-lg-start align-center pa-3">
              <v-list-subheader>权限字符</v-list-subheader>
              <v-text-field
                  v-model="sysMenu.perms"
                  label="权限字符"
                  hide-details="auto"
                  density="compact"
                  variant="outlined"
                  :color="setting.theme"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" class="d-flex justify-lg-start align-center pa-3">
              <v-list-subheader>路由参数</v-list-subheader>
              <v-text-field
                  v-model="sysMenu.query"
                  label="路由参数"
                  hide-details="auto"
                  density="compact"
                  variant="outlined"
                  :color="setting.theme"
                  clearable
              ></v-text-field>
            </v-col>
            <v-col cols="6" class="d-flex justify-lg-start align-center pa-3">
              <v-list-subheader>显示状态</v-list-subheader>
              <v-text-field
                  v-model="sysMenu.visible"
                  label="显示状态"
                  hide-details="auto"
                  density="compact"
                  variant="outlined"
                  :color="setting.theme"
                  clearable
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <p class="pa-4 d-flex justify-lg-end">
          <v-btn text="提交" :color="setting.theme" type="submit" :loading="submitLoading"></v-btn>
          <v-btn style="margin-left: 15px" text="取消" @click="menuDialog = false"></v-btn>
        </p>
      </v-form>
    </v-card>
  </v-dialog>
  <confirm-dialog v-model:show="confirmShow" :text="confirmText" @submit="confirmSubmit()"></confirm-dialog>
</template>
<script setup lang="ts">
import {ApiAddSysMenu, ApiEditSysMenu, ApiRemoveSysMenu, ApiSysMenuById, ApiSysMenuTree} from "@/api/sys/menu";
import {ref, reactive} from "vue";
import {VTreeview} from "vuetify/labs/VTreeview";
import {useToast} from "vue-toastification";
import ViewLoading from "@/components/ViewLoading"
import settingsStore from "@/store/modules/settings"
import ConfirmDialog from "@/components/ConfirmDialog/index.vue";

const setting = settingsStore()
const toast = useToast();
const params = reactive({
  menuName: "",
  status: "",
})

interface menuType {
  menuId: number,
  parentId: number,
  menuName: string,
  path: string,
  orderNum: number,
  menuType: string,
  status: string,
  component: string,
  visible: string,
  perms: string,
  icon: string,
  isFrame: string,
  query: string
}

const sysMenu = ref<menuType>({
  menuId: 0,
  parentId: 0,
  menuName: "",
  path: "",
  orderNum: 0,
  menuType: "M",
  status: "",
  component: "",
  visible: "",
  perms: "",
  icon: "",
  isFrame: "",
  query: ""
})
const paramsRef = ref(null);
const formRef = ref(null);
const headers = ["菜单名称", "路由地址", "排序", "菜单类型", "菜单状态", "图标", "操作"]
const isExpand = ref(false)
const menuDialog = ref(false)
const formTitle = ref("")
const formLoading = ref(false)
const submitLoading = ref(false)
const confirmShow = ref(false)
const confirmText = ref("")
const removeMenuId = ref()

const menuRules = {
  parentId: [(value: number) => {
    if (value != null) return true
    return '请选择上级菜单！'
  },],
  menuName: [(value: string) => {
    if (value) return true
    return '请填写菜单名称！'
  },],
  orderNum: [(value: number) => {
    if (value != null) return true
    return '请填写排序！'
  },],
  path: [(value: string) => {
    if (value) return true
    return '请填写路由地址！'
  },],
}

const sysMenuTree = ref<menuType[]>()

function resetParams() {
  (paramsRef.value as any).reset()
  getSysMenuTree()
}

function getSysMenuTree() {
  ApiSysMenuTree(params).then((res: any) => {
    sysMenuTree.value = res.data
  })
}

function edit(item: any) {
  formLoading.value = true
  formTitle.value = "修改菜单"
  menuDialog.value = true
  resetForm()
  ApiSysMenuById(item.menuId).then((res: any) => {
    sysMenu.value = res.data
  }).finally(() => {
    formLoading.value = false
  })
}

function add(menuId: number) {
  resetForm()
  sysMenu.value.parentId = menuId
  formTitle.value = "添加菜单"
  menuDialog.value = true
}

function submitFrom() {
  (formRef.value as any).validate().then((valid: any) => {
    if (valid.valid) {
      submitLoading.value = true
      sysMenu.value.parentId = Number(sysMenu.value.parentId)
      if (sysMenu.value.menuId) {
        ApiEditSysMenu(sysMenu.value).then(res => {
          toast.success("提交成功！")
        }).finally(() => {
          submitLoading.value = false
          menuDialog.value = false
        })
      } else {
        ApiAddSysMenu(sysMenu.value).then(res => {
          toast.success("提交成功！")
        }).finally(() => {
          submitLoading.value = false
          menuDialog.value = false
        })
      }
    }
  })
}

function confirmSubmit() {
  ApiRemoveSysMenu(removeMenuId.value).then(() => {
    getSysMenuTree()
    toast.success("删除成功")
  })
}

function remove(item: any) {
  removeMenuId.value = item.menuId
  confirmText.value = "是否确认删除菜单编号为" + removeMenuId.value + "的数据项？"
  confirmShow.value = true
}

function resetForm() {
  sysMenu.value = {
    menuId: 0,
    parentId: 0,
    menuName: "",
    path: "",
    orderNum: 0,
    menuType: "M",
    status: "",
    component: "",
    visible: "",
    perms: "",
    icon: "",
    isFrame: "",
    query: ""
  }
}

getSysMenuTree()

</script>
<style scoped>
.btn-open {
  position: absolute;
  left: 15px;
  top: 5px;
}

.tr-th {
  width: 150px;
  min-width: 100px;
}

.tr-td {
  width: 150px;
  min-width: 100px;
}

</style>
