import Axios from "@/library/axios";

const BASE_URL = "/api/upms/user";

/**
 * SmsCodeType
 * 短信验证码类型
 */
export enum SmsCodeType {
  UserLogin = "user_login",
  UserRegister = "user_register",
  ResetPassword = "reset_password"
}

export default {
  /**
   * 获取当前用户
   */
  currentUser() {
    return Axios.get(`${BASE_URL}/current`);
  },

  /**
   * 根据用户ID查询单个信息
   *
   * @param userId 用户ID
   */
  selectById(userId: string) {
    return Axios.get(`${BASE_URL}/select/id/${userId}`);
  },

  /**
   * 根据用户名查询是否存在
   *
   * @param username 用户名
   */
  existByUsername(username: string) {
    return Axios.get(`${BASE_URL}/exist/username/${username}`);
  },

  /**
   * 更新用户信息
   * 包含各项参数校验及数据转换
   *
   * @param username 用户名
   * @param data 用户参数
   */
  update(username: string, data: any) {
    return Axios.put(`${BASE_URL}/update/${username}`, data);
  },

  /**
   * 根据用户ID删除用户
   *
   * @param userId 用户ID
   * @return 是否成功
   */
  delete(userId: string) {
    return Axios.delete(`${BASE_URL}/update/${userId}`);
  },

  /**
   * 发送登录
   *
   * @param telephone 手机号码
   * @param type 短信类型
   */
  sendSmsCode(telephone: string, type: SmsCodeType) {
    return Axios.post(`${BASE_URL}/send/sms-code`, undefined, {
      params: {
        telephone: telephone,
        type: type
      }
    });
  }
};
