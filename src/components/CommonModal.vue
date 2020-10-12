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
    <slot :data="data" :onOk="onOk" />
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
      confirmLoading: false
    });

    const data = ref();

    function open(value) {
      state.visible = true;
      data.value = value;
    }

    function close() {
      state.visible = false;
    }

    async function onOk(callback: () => Promise<void>) {
      if (typeof callback !== "function") return;

      state.confirmLoading = true;
      await callback();
      state.confirmLoading = false;
    }

    return {
      state,
      data,
      open,
      close,
      onOk
    };
  }
});
</script>
