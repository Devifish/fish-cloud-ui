<template>
  <page-load-progress ref="loadProgress" />
  <a-config-provider
    :locale="locale"
    :transformCellText="transformCellText"
    :autoInsertSpaceInButton="true"
  >
    <router-view />
  </a-config-provider>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import zh_CN from "ant-design-vue/es/locale/zh_CN";
import { PageLoadProgress } from "@/components";
import { isEmpty } from "@/utils/common";

const router = useRouter();

// 路由变化更新loadProgress状态
const loadProgress = ref();
router.beforeEach(() => loadProgress.value.start());
router.afterEach(() => loadProgress.value.done());

// Antd 国际化
const locale = ref(zh_CN);

/**
 * Table 数据渲染
 * 用户空数据的默认配置
 */
function transformCellText({ text }) {
  return isEmpty(text) ? "/" : text;
}
</script>

<style lang="less">
#app {
  height: 100%;
}
</style>
