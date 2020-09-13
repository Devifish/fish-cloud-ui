<template>
  <a-layout class="main-layout">
    <!-- 侧栏菜单 -->
    <a-layout-sider
      v-model:collapsed="collapsed"
      breakpoint="lg"
      collapsed-width="0"
      width="256"
      :theme="theme"
      :trigger="null"
      @collapse="menuCollapseHandle"
    >
      <div class="logo" />
      <a-menu
        v-if="menuTree"
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        :theme="theme"
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

      <a-layout-content class="main-content">
        <div class="main-content-wrapper">
          <!-- 菜单面包屑 -->
          <a-breadcrumb class="main-content-breadcrumb">
            <a-breadcrumb-item href="/">
              <home-outlined />
              <span>首页</span>
            </a-breadcrumb-item>
            <template v-if="breadcrumbs?.length > 0">
              <a-breadcrumb-item v-for="item of breadcrumbs" :key="item">
                {{ item }}
              </a-breadcrumb-item>
            </template>
          </a-breadcrumb>

          <!-- 内容部分 -->
          <router-view />

          <!-- 尾部 -->
          <common-footer />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import CommonFooter from "@/components/common/CommonFooter.vue";
import SidebarMenu from "@/components/SidebarMenu.vue";
import { MenuOutlined, HomeOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  name: "MainLayout",
  components: {
    CommonFooter,
    SidebarMenu,
    MenuOutlined,
    HomeOutlined
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    // 计算菜单IdMap
    const menuIdMap = computed(() => {
      const menuMap = store.getters["menu/menuMap"];
      return menuMap((menu: any) => menu.id);
    });

    // 计算当前路由菜单树
    const currentMenuTree = computed(() => {
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

      // 获取当前菜单数据
      const { path } = route;
      const filterMenu = store.getters["menu/filterMenu"];
      const current = filterMenu((menu: any) => menu.url == path);
      return current ? [current, ...findParentList(current)] : [];
    });

    // 页面状态
    const state = reactive({
      theme: "dark",
      collapsed: false,
      openKeys: [] as Array<any>,
      selectedKeys: [] as Array<any>,
      menuTree: computed(() => store.state.menu.menuTree),
      breadcrumbs: computed(() => {
        const { value } = currentMenuTree;
        return value?.map(item => item.name).reverse();
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
      const data = menuIdMap.value[menuId];

      // 如果菜单存在URL则重定向
      if (data.url) {
        router.push(data.url);
      }
    }

    // 加载菜单数据
    (async () => {
      await store.dispatch("menu/loadMenu");

      const { value } = currentMenuTree;
      if (value?.length > 0) {
        state.selectedKeys = [value[0]?.id];
        state.openKeys = value.slice(1).map(item => item.id);
      }
    })();

    return {
      ...toRefs(state),
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

  .main-content {
    overflow: auto;

    .main-content-breadcrumb {
      margin: 16px 0;
    }

    .main-content-wrapper {
      padding: 0 16px;
      min-width: 900px;
    }
  }
}
</style>
