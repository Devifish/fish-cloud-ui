<template>
  <a-drawer
    v-model:visible="state.visible"
    :title="title"
    :width="width"
    :placement="placement"
    destroyOnClose
  >
    <slot :data="state.data" :onOk="onOk" />
    <div class="common-drawer-footer">
      <a-button @click="close">
        {{ cancelText }}
      </a-button>
      <a-button type="primary" @click="clickOkHandle" style="margin-left: 8px">
        {{ okText }}
      </a-button>
    </div>
  </a-drawer>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { Drawer } from "ant-design-vue";

export default defineComponent({
  name: "CommonDrawer",
  props: {
    title: String,
    width: Number,
    placement: String,
    okText: {
      type: String,
      default: "确定"
    },
    cancelText: {
      type: String,
      default: "取消"
    }
  },
  setup() {
    const state = reactive({
      visible: false,
      data: undefined,
      onOk: async () => {}
    });

    function open(data) {
      state.visible = true;
      state.data = data;
    }

    function close() {
      state.visible = false;
    }

    function onOk(callback: () => Promise<void>) {
      state.onOk = callback;
    }

    async function clickOkHandle() {
      if (typeof state.onOk === "function") {
        //state.confirmLoading = true;
        try {
          const value = await state.onOk();
        } finally {
          //state.confirmLoading = false;
        }
      }

      state.visible = false;
    }

    return {
      state,
      open,
      close,
      onOk,
      clickOkHandle
    };
  }
});
</script>

<style lang="less">
.common-drawer-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
}
</style>
