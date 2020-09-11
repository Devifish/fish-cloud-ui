<template>
  <a-sub-menu
    v-if="data.children?.length > 0"
    :key="data.id"
    :title="data.name"
    v-bind="menuProps"
  >
    <sidebar-menu v-for="item of data.children" :data="item" :key="item.id" />
  </a-sub-menu>
  <a-menu-item v-else :key="data.id" v-bind="menuProps">
    {{ data.name }}
  </a-menu-item>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Menu } from "ant-design-vue";

const DEFAULT_PROPS = {
  data: Object
};

export default defineComponent({
  name: "SidebarMenu",
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
