<template>
  <a-layout class="main-layout">
    <a-layout-sider
      v-model:collapsed="collapsed"
      theme="dark"
      @collapse="menuCollapseHandle"
    >
      <div class="logo" />
      <a-menu
        theme="dark"
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        v-if="menuTree"
      >
        <template v-for="item of menuTree" :key="item.id">
          <template v-if="item.children?.length > 0">
            <sub-menu-tree :data="item" />
          </template>
          <a-menu-item v-else :key="item.id">
            {{ item.name }}
          </a-menu-item>
        </template>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-outlined class="menu-trigger" @click="collapsed = !collapsed" />
      </a-layout-header>

      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item v-for="item of breadcrumbs" :key="item">
            {{ item }}
          </a-breadcrumb-item>
        </a-breadcrumb>

        <router-view />
      </a-layout-content>

      <common-footer />
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  computed,
  toRefs,
  onBeforeMount,
  Component
} from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import CommonFooter from "@/components/common/CommonFooter.vue";
import { Menu } from "ant-design-vue";
import {
  PieChartOutlined,
  MenuOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined
} from "@ant-design/icons-vue";

const SubMenuTree: Component = {
  template: `
    <a-sub-menu :key="data.id" v-bind="$props" v-on="$listeners">
      <span slot="title">
        <a-icon type="mail" /><span>{{ data.title }}</span>
      </span>
      <template v-for="item in data.children">
        <sub-menu-tree v-if="item.children?.length > 0" :key="item.id" :data="item" />
        <a-menu-item v-else :key="item.id">
          <span>{{ item.title }}</span>
        </a-menu-item>
      </template>
    </a-sub-menu>
  `,
  isSubMenu: true,
  props: {
    ...(Menu.SubMenu as any).props,
    data: Object
  }
};

export default defineComponent({
  name: "MainLayout",
  components: {
    CommonFooter,
    SubMenuTree,
    MenuOutlined,
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined
  },
  setup() {
    const route = useRoute();
    const store = useStore();

    const state = reactive({
      collapsed: false,
      selectedKeys: null
    });

    const menuTree = store.state.menu.menuTree;
    const breadcrumbs = computed(() => route.path.split("/"));

    function menuCollapseHandle(collapsed: boolean) {
      //this.collapsed = collapsed;
    }

    // 获取菜单数据
    onBeforeMount(() => {
      store.dispatch("menu/loadMenu");
    });

    return {
      ...toRefs(state),
      breadcrumbs,
      menuTree,
      menuCollapseHandle
    };
  }
});
</script>

<style lang="less">
@import "~ant-design-vue/lib/style/themes";

.main-layout {
  width: 100%;
  height: 100%;

  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }

  .menu-trigger {
    font-size: 18px;
    line-height: 72px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: @primary-color;
    }
  }
}
</style>
