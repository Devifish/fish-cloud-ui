<template>
  <a-form
    id="formLogin"
    class="user-login-page"
    ref="formLogin"
    :model="form"
    @submit="loginSubmit"
  >
    <a-alert
      v-if="state.isLoginError"
      type="error"
      showIcon
      style="margin-bottom: 24px;"
      :message="state.message"
    />

    <a-tabs
      :activeKey="activeKey"
      :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
      @change="tabChangeHandle"
    >
      <!-- 用于账号密码方式登录系统 -->
      <a-tab-pane key="password" tab="账号密码登录">
        <a-form-item name="username">
          <a-input
            v-model:value="form.username"
            size="large"
            type="text"
            placeholder="请输入用户名"
          >
            <template v-slot:prefix>
              <user-outlined class="input-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item name="password">
          <a-input-password
            v-model:value="form.password"
            size="large"
            placeholder="请输入密码"
          >
            <template v-slot:prefix>
              <lock-outlined class="input-icon" />
            </template>
          </a-input-password>
        </a-form-item>
      </a-tab-pane>

      <!-- 用于短信验证码方式登录系统 -->
      <a-tab-pane key="sms-code" tab="短信登录">
        <a-form-item>
          <a-input
            v-model:value="form.telephone"
            size="large"
            type="text"
            placeholder="请输入手机号"
          >
            <template v-slot:prefix>
              <mobile-outlined class="input-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-row :gutter="16">
          <a-col class="gutter-row" :span="15">
            <a-form-item>
              <a-input
                v-model:value="form.smsCode"
                size="large"
                type="text"
                placeholder="请输入验证码"
              >
                <template v-slot:prefix>
                  <mail-outlined class="input-icon" />
                </template>
              </a-input>
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :span="9">
            <a-button
              class="get-captcha"
              tabindex="-1"
              :disabled="state.disableSmsBtn"
              @click="sendSmsCodeHandle"
            >
              获取验证码
              <template v-if="state.disableSmsBtn">
                {{ `(${state.timeout}s)` }}
              </template>
            </a-button>
          </a-col>
        </a-row>
      </a-tab-pane>
    </a-tabs>

    <a-form-item>
      <a-checkbox v-model:checked="form.autoLogin">
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
        :loading="state.logging"
        :disabled="state.loginBtn"
      >
        登录
      </a-button>
    </a-form-item>

    <div class="user-login-other">
      <span>其他登录方式</span>
      <a-tooltip placement="bottom" title="暂不支持">
        <qq-outlined class="item-icon" />
        <wechat-outlined class="item-icon" />
        <weibo-circle-outlined class="item-icon" />
      </a-tooltip>
      <router-link class="register" to="/auth/register">
        注册账户
      </router-link>
    </div>
  </a-form>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  MailOutlined,
  QqOutlined,
  WechatOutlined,
  WeiboCircleOutlined
} from "@ant-design/icons-vue";
import {
  loginByPassword,
  loginBySmsCode,
  sendSmsCode,
  SmsCodeType
} from "@/api/auth";

const SEND_SMS_CODE_TIMEOUT = 60;

export default defineComponent({
  name: "Login",
  components: {
    UserOutlined,
    LockOutlined,
    MobileOutlined,
    MailOutlined,
    QqOutlined,
    WechatOutlined,
    WeiboCircleOutlined
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    // 页面状态
    const state = reactive({
      isLoginError: false,
      message: "",
      logging: false,
      disableSmsBtn: false,
      timeout: 0
    });

    // 表单参数
    const form = reactive({
      username: "",
      password: "",
      telephone: "",
      smsCode: "",
      autoLogin: false
    });

    // 当前Tab活动页
    const activeKey = computed(() => route.query.type ?? "password");

    /**
     * 提交登录表单
     *
     * @param e Event
     */
    async function loginSubmit(e: Event) {
      e.preventDefault();
      state.logging = true;

      try {
        let data: any;
        const key = activeKey.value;
        switch (key) {
          case "password": {
            const { username, password } = form;
            data = await loginByPassword(username, password);
            break;
          }
          case "sms-code": {
            const { telephone, smsCode } = form;
            data = await loginBySmsCode(telephone, smsCode);
            break;
          }
          default:
            return;
        }

        // 登录成功
        state.isLoginError = false;
        console.log(data);
      } catch (error) {
        state.message = error.response.data.message;
        state.isLoginError = true;
      } finally {
        state.logging = false;
      }
    }

    /**
     * 发送登录短信验证码处理
     */
    let sendSmsCodeInterval: number;
    async function sendSmsCodeHandle() {
      const { telephone } = form;
      await sendSmsCode(telephone, SmsCodeType.UserLogin);

      // 开始倒计时
      state.disableSmsBtn = true;
      state.timeout = SEND_SMS_CODE_TIMEOUT;
      sendSmsCodeInterval = setInterval(() => {
        state.timeout--;

        if (state.timeout <= 0) {
          state.disableSmsBtn = true;
          clearInterval(sendSmsCodeInterval);
        }
      }, 1000);
    }

    /**
     * Tab切换事件处理
     *
     * @param key Tabkey
     */
    function tabChangeHandle(key: string) {
      router.push({
        query: {
          type: key
        }
      });
    }

    return {
      route,
      router,
      state,
      form,
      activeKey,
      loginSubmit,
      tabChangeHandle,
      sendSmsCodeHandle
    };
  }
});
</script>

<style lang="less">
@import "ant-design-vue/lib/style/themes";

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
        color: @primary-color;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
