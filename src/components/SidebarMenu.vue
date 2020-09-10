<template>
  <a-sub-menu
    v-if="data.children?.length > 0"
    :key="data.id"
    :title="data.name"
    v-bind="$props"
  >
    <sidebar-menu v-for="item of data.children" :data="item" :key="item.id" />
  </a-sub-menu>
  <a-menu-item v-else :key="data.id" v-bind="$props">
    {{ data.name }}
  </a-menu-item>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Menu } from "ant-design-vue";

export default defineComponent({
  name: "SidebarMenu",
  props: {
    ...(Menu.SubMenu as any).props,
    data: Object
  },
  setup() {}
});
</script>
