<template>
  <page-load-progress ref="loadProgress" />
  <a-config-provider :locale="locale" :transformCellText="transformCellText">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import PageLoadProgress from "@/components/PageLoadProgress.vue";
import locale from "ant-design-vue/es/locale/zh_CN";

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
