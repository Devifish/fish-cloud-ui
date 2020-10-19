<template>
  <a-layout class="auth-layout">
    <div class="top">
      <div class="header">
        <a href="/">
          <img src="~@/assets/logo.svg" class="logo" alt="logo" />
          <span class="title">Fish Cloud</span>
        </a>
      </div>
      <div class="desc">
        欢迎使用 Fish Cloud 微服务开发框架
      </div>
    </div>

    <a-layout-content class="main">
      <router-view />
    </a-layout-content>

    <common-footer />
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { CommonFooter } from "@/components";

export default defineComponent({
  name: "AuthLayout",
  components: {
    CommonFooter
  }
});
</script>

<style lang="less">
.auth-layout {
  width: 100%;
  height: 100%;
  background: #f0f2f5 url(~@/assets/background.svg) no-repeat 50%;
  background-size: 100%;
  padding: 110px 0 144px;
  position: relative;

  a {
    text-decoration: none;
  }

  .top {
    text-align: center;

    .header {
      height: 44px;
      line-height: 44px;

      .badge {
        position: absolute;
        display: inline-block;
        line-height: 1;
        vertical-align: middle;
        margin-left: -12px;
        margin-top: -10px;
        opacity: 0.8;
      }

      .logo {
        height: 44px;
        vertical-align: top;
        margin-right: 16px;
        border-style: none;
      }

      .title {
        font-size: 33px;
        color: #333;
        font-family: Avenir, "Helvetica Neue", Arial, Helvetica, sans-serif;
        font-weight: 600;
        position: relative;
        top: 2px;
      }
    }
    .desc {
      font-size: 14px;
      color: #888;
      margin-top: 12px;
      margin-bottom: 40px;
    }
  }

  .main {
    min-width: 260px;
    min-height: 400px;
    width: 368px;
    margin: 0 auto;
  }
}
</style>
