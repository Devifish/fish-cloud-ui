import Axios from "@/library/axios";
import { PageParam } from "@/model/page";

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
  selectById(userId: any) {
    return Axios.get(`${BASE_URL}/select/id/${userId}`);
  },

  /**
   * 分页查询用户数据
   *
   * @param page 分页参数
   * @param params 查询参数
   */
  selectPage(page: PageParam, params: any) {
    return Axios.get(`${BASE_URL}/select/page`, {
      params: {
        ...page,
        ...params
      }
    });
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
    return Axios.delete(`${BASE_URL}/delete/id/${userId}`);
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
