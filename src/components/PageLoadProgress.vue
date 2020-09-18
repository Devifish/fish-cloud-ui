<template>
  <div class="load-progress" v-if="state.show">
    <div class="progress-bg" :style="{ width: `${state.percent}%` }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { sleep } from "@/utils/async";

export default defineComponent({
  name: "PageLoadProgress",
  props: {
    await: {
      type: Number,
      default: 250
    }
  },
  setup(props) {
    const state = reactive({
      show: false,
      percent: 0
    });

    // 加载进度定时器
    let loadPercentInterval: number | undefined;

    function start() {
      if (loadPercentInterval) return;

      // 显示进度条
      state.show = true;
      state.percent = 0;
      loadPercentInterval = setInterval(() => {
        const percent = state.percent;
        if (percent <= 25) {
          state.percent += 1;
        } else if (percent <= 50) {
          state.percent += 0.5;
        } else {
          clearInterval(loadPercentInterval);
        }
      }, 100);
    }

    async function done() {
      clearInterval(loadPercentInterval);
      loadPercentInterval = undefined;
      state.percent = 100;

      // 等待200毫秒关闭进度条
      await sleep(props.await);
      state.show = false;
    }

    return {
      state,
      start,
      done
    };
  }
});
</script>

<style lang="less">
@import "~ant-design-vue/lib/style/themes";

.load-progress {
  position: fixed;
  overflow: hidden;
  width: 100%;
  z-index: 999;

  .progress-bg {
    position: relative;
    height: 2px;
    background-color: @primary-color;
    transition: width 0.4s cubic-bezier(0.08, 0.82, 0.17, 1);
  }
}
</style>
