import Axios from "@/library/axios";

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
