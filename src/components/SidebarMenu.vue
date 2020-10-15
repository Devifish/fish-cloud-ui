<template>
  <a-sub-menu v-if="data.children?.length > 0" :key="data.id" v-bind="menuProps">
    <template v-slot:title>
      <img class="menu-icon" v-if="data.icon" :src="data.icon" />
      <span>{{ data.name }}</span>
    </template>
    <sidebar-menu v-for="item of data.children" :data="item" :key="item.id" />
  </a-sub-menu>
  <a-menu-item v-else :key="data.id" v-bind="menuProps">
    <img class="menu-icon" v-if="data.icon" :src="data.icon" />
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

<style lang="less" scoped>
.menu-icon {
  height: 16px;
  width: 16px;
  margin: -4px 10px 0 0;
}
</style>
