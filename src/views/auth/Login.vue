<template>
  <a-form id="formLogin" class="user-login-page" ref="formLogin">
    <a-tabs
      :activeKey="activeKey"
      :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
      @change="tabChangeHandle"
    >
      <!-- 用于账号密码方式登录系统 -->
      <a-tab-pane key="password" tab="账号密码登录">
        <a-alert
          v-if="isLoginError"
          type="error"
          showIcon
          style="margin-bottom: 24px;"
          message="账户或密码错误"
        />
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
      </a-tab-pane>

      <!-- 用于短信验证码方式登录系统 -->
      <a-tab-pane key="sms-code" tab="短信登录">
        <a-form-item>
          <a-input size="large" type="text" placeholder="请输入手机号">
            <template v-slot:prefix>
              <mobile-outlined class="input-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-row :gutter="16">
          <a-col class="gutter-row" :span="16">
            <a-form-item>
              <a-input size="large" type="text" placeholder="请输入验证码">
                <template v-slot:prefix>
                  <mail-outlined class="input-icon" />
                </template>
              </a-input>
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :span="8">
            <a-button class="get-captcha" tabindex="-1">
              获取验证码
            </a-button>
          </a-col>
        </a-row>
      </a-tab-pane>
    </a-tabs>

    <a-form-item>
      <a-checkbox>
        自动登录
      </a-checkbox>
      <router-link class="forge-password" to="/" style="float: right;">
        忘记密码
      </router-link>
    </a-form-item>

    <a-form-item style="margin-top:24px">
      <a-button
        size="large"
        type="primary"
        htmlType="submit"
        class="login-button"
      >
        登录
      </a-button>
    </a-form-item>

    <div class="user-login-other">
      <span>其他登录方式</span>
      <a>
        <qq-outlined class="item-icon" />
      </a>
      <a>
        <wechat-outlined class="item-icon" />
      </a>
      <a>
        <weibo-circle-outlined class="item-icon" />
      </a>
      <router-link class="register" to="/auth/register">
        注册账户
      </router-link>
    </div>
  </a-form>
</template>

<script lang="ts">
import { defineComponent, Component } from "vue";
import {
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  MailOutlined,
  QqOutlined,
  WechatOutlined,
  WeiboCircleOutlined
} from "@ant-design/icons-vue";

export default defineComponent({
  name: "Login",
  setup() {
    return {
      isLoginError: false
    };
  },
  computed: {
    activeKey() {
      return this.$route.query.type || "password";
    }
  },
  methods: {
    tabChangeHandle(key: string) {
      this.$router.push({
        query: {
          type: key
        }
      });
    }
  },
  components: {
    UserOutlined,
    LockOutlined,
    MobileOutlined,
    MailOutlined,
    QqOutlined,
    WechatOutlined,
    WeiboCircleOutlined
  } as Record<string, Component>
});
</script>

<style lang="less">
.user-login-page {
  .input-icon {
    color: #aaa;
  }

  .login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .get-captcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
