<template>
  <a-form id="formRegister" class="user-register-page" ref="formRegister" @submit="registerSubmit">
    <a-page-header class="title" title="用户注册" @back="$router.back()" style="padding: 0" />
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
      <a-button size="large" type="primary" htmlType="submit" class="register-button">
        注册
      </a-button>
      <router-link class="login" to="/auth/login">
        使用已有账户登录
      </router-link>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Form, message } from "ant-design-vue";
import { UserOutlined, LockOutlined, MobileOutlined, MailOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  name: "Register",
  components: {
    UserOutlined,
    LockOutlined,
    MobileOutlined,
    MailOutlined
  },
  setup() {
    const formRegister = ref();

    /**
     * 提交注册表单
     *
     * @param e Event
     */
    async function registerSubmit() {
      await formRegister.value?.validate();

      message.warn("暂不提供注册功能");
    }

    return {
      formRegister,
      registerSubmit
    };
  }
});
</script>

<style lang="less">
.user-register-page {
  .input-icon {
    color: #aaa;
  }

  .title {
    margin-bottom: 20px;
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
