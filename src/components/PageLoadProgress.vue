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
  setup() {
    const state = reactive({
      show: false,
      percent: 0
    });
    let loadPercentInterval: number;

    function start() {
      state.show = true;
      state.percent = 0;
      loadPercentInterval = setInterval(() => {
        const percent = state.percent;
        if (percent <= 25) {
          state.percent += 1;
        } else if (percent <= 50) {
          state.percent += 0.5;
        }
      }, 100);
    }

    async function done() {
      clearInterval(loadPercentInterval);
      state.percent = 100;

      await sleep(400);
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
.load-progress {
  position: fixed;
  overflow: hidden;
  width: 100%;
  z-index: 999;

  .progress-bg {
    position: relative;
    height: 2px;
    background-color: #1890ff;
    transition: width 0.4s cubic-bezier(0.08, 0.82, 0.17, 1);
  }
}
</style>
