<template>
  <a-layout class="main-layout">
    <a-layout-sider
      v-model:collapsed="collapsed"
      theme="dark"
      @collapse="menuCollapseHandle"
    >
      <div class="logo" />
      <a-menu theme="dark" v-model:selectedKeys="selectedKeys" mode="inline">
        <a-menu-item key="1">
          <pie-chart-outlined />
          <span>Dashboard</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <template v-slot:title>
            <span>
              <user-outlined />
              <span>用户管理</span>
            </span>
          </template>
          <a-menu-item key="3">用户管理</a-menu-item>
          <a-menu-item key="4">角色管理</a-menu-item>
          <a-menu-item key="5">部门管理</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template v-slot:title>
            <span>
              <team-outlined />
              <span>系统设置</span>
            </span>
          </template>
          <a-menu-item key="6">菜单管理</a-menu-item>
          <a-menu-item key="8">字典管理</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="9">
          <file-outlined />
          <span>File</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-outlined class="menu-trigger" @click="collapsed = !collapsed" />
      </a-layout-header>

      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>

        <router-view />
      </a-layout-content>

      <common-footer />
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import CommonFooter from "@/components/common/CommonFooter.vue";
import {
  PieChartOutlined,
  MenuOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined
} from "@ant-design/icons-vue";

export default defineComponent({
  name: "MainLayout",
  components: {
    CommonFooter,
    MenuOutlined,
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined
  },
  setup() {
    const state = reactive({
      collapsed: false,
      selectedKeys: null
    });

    function menuCollapseHandle(collapsed: boolean) {
      //this.collapsed = collapsed;
    }

    return {
      ...toRefs(state),
      menuCollapseHandle
    };
  }
});
</script>

<style lang="less">
@import "ant-design-vue/lib/style/themes";

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
