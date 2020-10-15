<template>
  <a-sub-menu v-if="data.children?.length > 0" :key="data.id" v-bind="menuProps">
    <template v-slot:title>
      <icon v-if="data.icon" :component="{ template: data.icon }" />
      <span>{{ data.name }}</span>
    </template>
    <sidebar-menu v-for="item of data.children" :data="item" :key="item.id" />
  </a-sub-menu>
  <a-menu-item v-else :key="data.id" v-bind="menuProps">
    <icon v-if="data.icon" :component="{ template: data.icon }" />
    {{ data.name }}
  </a-menu-item>
</template>

<script lang="ts">
import { defineComponent, createVNode, Component } from "vue";
import { Menu } from "ant-design-vue";
import Icon from "@ant-design/icons-vue";

const DEFAULT_PROPS = {
  data: Object
};

export default defineComponent({
  name: "SidebarMenu",
  components: {
    Icon
  },
  props: {
    ...(Menu.SubMenu as any).props,
    ...DEFAULT_PROPS
  },
  setup(props) {
    const menuProps = { ...props };
    const defaultPropsKeys = Object.keys(DEFAULT_PROPS);

    // 移除与Antd菜单组件不相关数据
    for (var key of defaultPropsKeys) {
      delete menuProps[key];
    }

    return {
      menuProps
    };
  }
});
</script>
