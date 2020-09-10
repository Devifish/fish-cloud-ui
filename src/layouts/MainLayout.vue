<template>
  <a-layout class="main-layout">
    <!-- 侧栏菜单 -->
    <a-layout-sider
      v-model:collapsed="collapsed"
      theme="dark"
      @collapse="menuCollapseHandle"
    >
      <div class="logo" />
      <a-menu
        v-if="menuTree"
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        theme="dark"
        @click="menuClickHandle"
      >
        <template v-for="item of menuTree" :key="item.id">
          <sidebar-menu :data="item" />
        </template>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-outlined class="menu-trigger" @click="collapsed = !collapsed" />
      </a-layout-header>

      <a-layout-content style="margin: 0 16px">
        <!-- 菜单面包屑 -->
        <a-breadcrumb v-if="breadcrumbs?.length > 0" style="margin: 16px 0">
          <a-breadcrumb-item v-for="item of breadcrumbs" :key="item">
            {{ item }}
          </a-breadcrumb-item>
        </a-breadcrumb>

        <!-- 菜单内容 -->
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
  onBeforeMount
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore, mapGetters } from "vuex";
import CommonFooter from "@/components/common/CommonFooter.vue";
import SidebarMenu from "@/components/SidebarMenu.vue";
import { MenuOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  name: "MainLayout",
  components: {
    CommonFooter,
    SidebarMenu,
    MenuOutlined
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const filterMenu = store.getters["menu/filterMenu"];
    const menuMap = store.getters["menu/menuMap"];

    // 监听菜单数据
    const menuTree = computed(() => store.state.menu.menuTree);
    const menuIdMap = computed(() => menuMap((menu: any) => menu.id));
    const currentMenuTree = computed(() => {
      const { path } = route;
      const current = filterMenu((menu: any) => menu.url == path);
      const findParentList = (menu: any) => {
        let list: any[] = [];
        const { parentId } = menu;
        if (parentId) {
          const parentMenu = menuIdMap.value[parentId];
          if (parentMenu) list.push(parentMenu);

          const parentList = findParentList(parentMenu);
          if (parentList.length > 0) {
            list = list.concat(parentList);
          }
        }
        return list;
      };

      return [current, ...findParentList(current)];
    });

    // 页面状态
    const state = reactive({
      collapsed: false,
      openKeys: computed(() => {
        const { value } = currentMenuTree;
        return value.slice(1).map(item => item.id);
      }),
      selectedKeys: computed(() => {
        const { value } = currentMenuTree;
        return [value[0].id];
      }),
      breadcrumbs: computed(() => {
        const { value } = currentMenuTree;
        return value.map(item => item.name);
      })
    });

    /**
     * 侧栏菜单打开收起事件处理
     *
     * @param collapsed 状态
     */
    function menuCollapseHandle(collapsed: boolean) {}

    /**
     * 菜单点击事件处理
     *
     * @param e Event
     */
    function menuClickHandle(e: any) {
      const menuId = e.key;
      const data = menuMap.value[menuId];

      // 如果菜单存在URL则重定向
      if (data.url) {
        router.push(data.url);
      }
    }

    // 加载菜单数据
    store.dispatch("menu/loadMenu");

    return {
      ...toRefs(state),
      menuTree,
      menuClickHandle,
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
