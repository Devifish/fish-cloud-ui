import { AxiosBasicCredentials } from "axios";
import Axios from "@/library/axios";

// 系统OAuth2 Client鉴权
const OAuthClient: AxiosBasicCredentials = {
  username: "server",
  password: "123456"
};

/**
 * 密码方式用户登录
 *
 * @param username 用户名
 * @param password 密码
 */
export function loginByPassword(username: string, password: string) {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);

  return Axios.post("/api/upms/oauth/token", formData, {
    auth: OAuthClient,
    params: {
      grant_type: "password"
    },
    message: {
      show: false
    }
  });
}

/**
 * 短信验证码方式用户登录
 *
 * @param telephone 手机号
 * @param code 验证码
 */
export function loginBySmsCode(telephone: string, code: string) {
  const formData = new FormData();
  formData.append("telephone", telephone);
  formData.append("code", code);

  return Axios.post("/api/upms/oauth/token", formData, {
    auth: OAuthClient,
    params: {
      grant_type: "sms_code"
    },
    message: {
      show: false
    }
  });
}

/**
 * SmsCodeType
 * 短信验证码类型
 */
export enum SmsCodeType {
  UserLogin = "user_login",
  UserRegister = "user_register",
  ResetPassword = "reset_password"
}

/**
 * 发送登录
 *
 * @param telephone
 */
export function sendSmsCode(telephone: string, type: SmsCodeType) {
  return Axios.post("/api/upms/user/send/sms-code", undefined, {
    params: {
      telephone: telephone,
      type: type
    }
  });
}
