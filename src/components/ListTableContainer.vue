<template>
  <div class="fish-list-layout">
    <a-card v-if="$slots.search">
      <slot name="search" />
    </a-card>

    <a-card>
      <template v-slot:title>
        <span>{{ title }}</span>
        <span class="reload" v-if="$attrs.onReload" @click="reloadHandle">
          <reload-outlined />
        </span>
      </template>
      <template v-if="$slots.extra" v-slot:extra>
        <slot name="extra" />
      </template>

      <slot />
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ReloadOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  name: "ListTableContainer",
  components: {
    ReloadOutlined
  },
  props: {
    title: String
  },
  setup(props, ctx) {
    function reloadHandle() {
      ctx.emit("reload");
    }

    return {
      reloadHandle
    };
  }
});
</script>

<style lang="less">
@import "~ant-design-vue/lib/style/themes";

.fish-list-layout {
  .reload {
    color: @text-color-secondary;
    cursor: pointer;
    transition: all 0.3s;
    margin-left: 8px;

    &:hover {
      color: @primary-color;
    }
  }
}
</style>
