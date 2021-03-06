<template>
  <a-form
    id="formLogin"
    class="user-login-page"
    ref="formLogin"
    :wrapper-col="{ span: 24 }"
    :rules="rules"
    :model="form"
  >
    <a-alert v-if="state.isLoginError" type="error" :message="state.message" show-icon />

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
          <a-input-password v-model:value="form.password" size="large" placeholder="请输入密码">
            <template v-slot:prefix>
              <lock-outlined class="input-icon" />
            </template>
          </a-input-password>
        </a-form-item>
      </a-tab-pane>

      <!-- 用于短信验证码方式登录系统 -->
      <a-tab-pane key="sms-code" tab="短信登录">
        <a-form-item name="telephone">
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
            <a-form-item name="smsCode">
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
        @click="loginSubmit"
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
import { defineComponent, reactive, computed, ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { Form, message } from "ant-design-vue";
import {
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  MailOutlined,
  QqOutlined,
  WechatOutlined,
  WeiboCircleOutlined
} from "@ant-design/icons-vue";
import AuthApi from "@/api/auth";
import UserApi, { SmsCodeType } from "@/api/user";
import { PHONE_NUM } from "@/utils/regexp";

const SEND_SMS_CODE_TIMEOUT = 60;
const LOGIN_SUCCESS_PATH = "/";

// 表单校验
const rules = {
  username: { required: true, message: "用户名不能为空", trigger: "blur" },
  password: { required: true, message: "密码不能为空", trigger: "blur" },
  telephone: { required: true, pattern: PHONE_NUM, message: "输入的手机号不正确", trigger: "blur" },
  smsCode: { required: true, message: "验证码不能为空", trigger: "blur" }
};

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
    const store = useStore();

    const isLogin = store.getters["auth/isLogin"];
    if (isLogin) router.push(LOGIN_SUCCESS_PATH);

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

    const formLogin = ref();
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
        let tokenData: any;
        const key = activeKey.value;
        switch (key) {
          case "password":
            await formLogin.value?.validate(["username", "password"]);

            const { username, password } = form;
            tokenData = await AuthApi.loginByPassword(username, password);
            break;
          case "sms-code":
            await formLogin.value?.validate(["telephone", "smsCode"]);

            const { telephone, smsCode } = form;
            tokenData = await AuthApi.loginBySmsCode(telephone, smsCode);
            break;
        }

        // 登录成功
        message.success("登录成功");
        state.isLoginError = false;
        store.commit("auth/saveToken", {
          tokenData,
          expire: form.autoLogin
        });

        // 登录成功重定向
        const redirectUri = route.query.redirect_uri as string;
        router.push(redirectUri || LOGIN_SUCCESS_PATH);
      } catch (error) {
        if (!error.response) return;

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
      await formLogin.value?.validate(["telephone"]);
      await UserApi.sendSmsCode(telephone, SmsCodeType.UserLogin);
      message.success("已发送至您的手机，请注意查收");

      // 开始倒计时
      state.disableSmsBtn = true;
      state.timeout = SEND_SMS_CODE_TIMEOUT;
      sendSmsCodeInterval = setInterval(() => {
        state.timeout--;

        if (state.timeout <= 0) {
          state.disableSmsBtn = false;
          clearInterval(sendSmsCodeInterval);
        }
      }, 1000);
    }

    /**
     * Tab切换事件处理
     *
     * @param e tab键
     */
    function tabChangeHandle(e: string) {
      router.push({
        query: {
          ...route.query,
          type: e
        }
      });
    }

    return {
      state,
      form,
      rules,
      formLogin,
      activeKey,
      loginSubmit,
      sendSmsCodeHandle,
      tabChangeHandle
    };
  }
});
</script>

<style lang="less">
@import "~ant-design-vue/lib/style/themes";

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
