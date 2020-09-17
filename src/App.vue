<template>
  <page-load-progress ref="loadProgress" />
  <router-view />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
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

    return {
      loadProgress
    };
  }
});
</script>

<style lang="less">
#app {
  height: 100%;
}
</style>
