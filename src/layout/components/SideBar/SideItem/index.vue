<template>
  <v-list-item :value="item.path"
               @click="activate(item)"
               color="primary"
               :title="(item.meta && item.meta.title)?item.meta.title:item.children[0].meta.title"
               :class="{'v-list-item--active text-primary': resolvePath(item.path) === isPath || (item.children && item.children[0].path === isPath)}"
               style="margin-inline-start: calc(4px + var(--indent-padding) / 2);padding-inline-start: 8px !important;">
    <template v-slot:prepend>
      <v-icon size="small" :icon="(item.meta && item.meta.icon)?item.meta.icon:item.children[0].meta.icon"
              class="icon-offset"></v-icon>
    </template>
  </v-list-item>
</template>
<script setup lang="ts">
import {useRouter} from "vue-router";
import {isExternal} from "@/utils/validate";
import {getNormalPath} from "@/utils/wrblog";

const props = defineProps({
  item: {
    type: Object,
    default: {},
  },
  isPath: {
    type: String,
    default: '',
  },
  basePath: {
    type: String,
    default: '',
  },
})
const router = useRouter()

function activate(val: any) {
  router.push(resolvePath(val.path === "/" ? val.children[0].path : val.path, val.query))
}

function resolvePath(routePath: any, routeQuery?: any) {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }
  if (routeQuery) {
    let query = JSON.parse(routeQuery);
    return {path: getNormalPath(props.basePath + '/' + routePath), query: query};
  }
  return getNormalPath(props.basePath + '/' + routePath);
}
</script>
<style scoped>

</style>
