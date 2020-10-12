<template>
  <a-modal
    v-model:visible="state.visible"
    :title="title"
    :width="1000"
    :footer="footer"
    :destroyOnClose="true"
    :confirmLoading="state.confirmLoading"
    @ok="onOk"
  >
    <slot :data="state.data" :onOk="onOk" />
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "CommonModal",
  props: {
    title: String,
    footer: Object,
    width: {
      type: Number,
      defaule: 1000
    }
  },
  setup() {
    const state = reactive({
      visible: false,
      confirmLoading: false,
      data: undefined
    });

    function open(data) {
      state.visible = true;
      state.data = data;
    }

    function close() {
      state.visible = false;
    }

    async function onOk(callback: () => Promise<void>) {
      if (typeof callback === "function") {
        state.confirmLoading = true;
        const value = await callback();
        state.confirmLoading = false;
      }

      state.visible = false;
    }

    return {
      state,
      open,
      close,
      onOk
    };
  }
});
</script>
