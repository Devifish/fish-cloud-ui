<template>
  <a-layout class="main-layout">
    <!-- 侧栏菜单 -->
    <a-layout-sider
      v-model:collapsed="collapsed"
      breakpoint="lg"
      collapsed-width="0"
      :theme="theme"
      :trigger="null"
    >
      <div class="logo">
        <h1>Fish Cloud</h1>
      </div>
      <a-menu
        v-if="menuTree"
        v-model:openKeys="state.openKeys"
        :selectedKeys="selectedKeys"
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
      <a-layout-header class="main-header">
        <menu-outlined class="menu-item menu-icon" @click="collapsed = !collapsed" />

        <div class="right-content" v-if="user">
          <avatar-dropdown
            class="menu-item"
            :avatar="user.avatar"
            :username="user.nickname || user.username"
          >
            <a-menu>
              <a-menu-item>
                <user-outlined />
                个人中心
              </a-menu-item>
              <a-menu-item>
                <lock-outlined />
                修改密码
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item @click="userLogout">
                <logout-outlined />
                退出登录
              </a-menu-item>
            </a-menu>
          </avatar-dropdown>

          <span class="menu-item menu-icon" @click="userLogout">
            <logout-outlined />
          </span>
        </div>
      </a-layout-header>

      <!-- 内容部分 -->
      <a-layout-content class="main-content">
        <!-- 菜单面包屑 -->
        <a-breadcrumb class="main-content-breadcrumb">
          <a-breadcrumb-item href="/">
            <home-outlined />
          </a-breadcrumb-item>
          <template v-if="breadcrumbs?.length > 0">
            <a-breadcrumb-item v-for="item of breadcrumbs" :key="item">
              {{ item }}
            </a-breadcrumb-item>
          </template>
        </a-breadcrumb>

        <router-view />
      </a-layout-content>

      <!-- 尾部 -->
      <common-footer />
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, watch, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import CommonFooter from "@/components/common/CommonFooter.vue";
import SidebarMenu from "@/components/SidebarMenu.vue";
import AvatarDropdown from "@/components/AvatarDropdown.vue";
import {
  MenuOutlined,
  HomeOutlined,
  UserOutlined,
  LockOutlined,
  LogoutOutlined
} from "@ant-design/icons-vue";

export default defineComponent({
  name: "MainLayout",
  components: {
    CommonFooter,
    SidebarMenu,
    AvatarDropdown,
    MenuOutlined,
    HomeOutlined,
    UserOutlined,
    LockOutlined,
    LogoutOutlined
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
      selectedKeys: computed(() => [currentMenuTree.value[0]?.id ?? -1]),
      menuTree: computed(() => store.state.menu.menuTree),
      breadcrumbs: computed(() => currentMenuTree.value?.map(item => item.name).reverse()),
      user: computed(() => store.state.auth.user)
    });

    // 监听当前菜单变化自动展开父级菜单
    watch(currentMenuTree, val => {
      if (val.length == 0) return;

      const openMenuIds = val.slice(1).map(item => item.id);
      for (let openMenuId of openMenuIds) {
        const openKeys = state.openKeys;
        if (!openKeys.includes(openMenuId)) {
          openKeys.push(openMenuId);
        }
      }
    });

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

    /**
     * 用户注销
     */
    async function userLogout() {
      await store.dispatch("auth/logout");

      // 完成注销后刷新页面
      location.reload();
    }

    // 加载数据
    store.dispatch("auth/currentUser");
    store.dispatch("menu/loadMenu");

    return {
      state,
      ...toRefs(state),
      menuClickHandle,
      userLogout
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
    height: 64px;
    line-height: 64px;

    > h1 {
      color: #fff;
      font-size: 22px;
      font-weight: 600;
      margin: 0 0 0 24px;
      vertical-align: middle;
    }
  }

  .main-header {
    position: relative;
    background: #fff;
    padding: 0;

    .menu-item {
      transition: all 0.3s;

      &:hover {
        cursor: pointer;
        color: @primary-color;
        background-color: #f5f5f5;
      }
    }

    .menu-icon {
      font-size: 18px;
      line-height: 64px;
      padding: 0 24px;
    }

    .right-content {
      position: absolute;
      top: 0;
      right: 0;
      margin-right: 8px;

      > span {
        float: left;
        height: 100%;
        padding: 0 8px;
      }
    }
  }

  .main-content {
    padding: 0 16px;
    overflow: auto;

    .main-content-breadcrumb {
      margin: 16px 0;
    }
  }
}
</style>
