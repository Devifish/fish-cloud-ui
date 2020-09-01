<template>
  <a-form id="formRegister" class="user-register-page" ref="formRegister">
    <h3>
      <span>用户注册</span>
    </h3>
    <a-form-item>
      <a-input size="large" type="text" placeholder="请输入用户名">
        <template v-slot:prefix>
          <user-outlined class="input-icon" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input-password size="large" placeholder="请输入密码">
        <template v-slot:prefix>
          <lock-outlined class="input-icon" />
        </template>
      </a-input-password>
    </a-form-item>
    <a-form-item>
      <a-input-password size="large" placeholder="请确认密码">
        <template v-slot:prefix>
          <lock-outlined class="input-icon" />
        </template>
      </a-input-password>
    </a-form-item>
    <a-form-item>
      <a-button
        size="large"
        type="primary"
        htmlType="submit"
        class="register-button"
      >
        注册
      </a-button>
      <router-link class="login" to="/auth/login">
        使用已有账户登录
      </router-link>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { defineComponent, Component } from "vue";
import {
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  MailOutlined
} from "@ant-design/icons-vue";

export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
    MobileOutlined,
    MailOutlined
  }
});
</script>

<style lang="less">
.user-register-page {
  .input-icon {
    color: #aaa;
  }

  & > h3 {
    font-size: 18px;
    margin-bottom: 20px;
    text-align: center;
  }

  .register-button {
    width: 50%;
  }

  .login {
    float: right;
    line-height: 40px;
  }
}
</style>
