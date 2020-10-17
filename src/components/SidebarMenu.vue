<template>
  <template v-if="filter(data)">
    <a-sub-menu v-if="hasChildren(data)" :key="data.id" v-bind="menuProps">
      <template v-slot:title>
        <img class="menu-icon" v-if="data.icon" :src="data.icon" />
        <span>{{ data.name }}</span>
      </template>
      <sidebar-menu v-for="item of data.children" :data="item" :key="item.id" :filter="filter" />
    </a-sub-menu>
    <a-menu-item v-else :key="data.id" v-bind="menuProps">
      <img class="menu-icon" v-if="data.icon" :src="data.icon" />
      {{ data.name }}
    </a-menu-item>
  </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Menu } from "ant-design-vue";
import { isEmpty } from "@/utils/common";

const DEFAULT_PROPS = {
  data: Object,
  filter: {
    type: Function,
    default: (menu: any) => true
  }
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

    function hasChildren(menu: any) {
      const children: Array<any> = menu.children;
      if (isEmpty(children)) return false;

      // 校验过滤后的参数
      return children.filter(props.filter).length > 0;
    }

    return {
      menuProps,
      hasChildren
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
