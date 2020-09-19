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

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import zh_CN from "ant-design-vue/es/locale/zh_CN";
import PageLoadProgress from "@/components/PageLoadProgress.vue";

export default defineComponent({
  name: "App",
  components: {
    PageLoadProgress
  },
  setup() {
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
    function transformCellText(data: any) {
      const { text } = data;

      switch (text) {
        case undefined:
        case null:
          return "/";
        default:
          return text;
      }
    }

    return {
      locale,
      loadProgress,
      transformCellText
    };
  }
});
</script>

<style lang="less">
#app {
  height: 100%;
}
</style>
