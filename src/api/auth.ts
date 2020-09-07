import { AxiosBasicCredentials } from "axios";
import Axios from "@/library/axios";

const BASE_URL = "/api/upms/oauth";

// 系统OAuth2 Client鉴权
const OAuthClient: AxiosBasicCredentials = {
  username: "server",
  password: "123456"
};

export default {
  /**
   * 密码方式用户登录
   *
   * @param username 用户名
   * @param password 密码
   */
  loginByPassword(username: string, password: string) {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    return Axios.post(`${BASE_URL}/token`, formData, {
      auth: OAuthClient,
      params: {
        grant_type: "password"
      },
      message: {
        show: false
      }
    });
  },

  /**
   * 短信验证码方式用户登录
   *
   * @param telephone 手机号
   * @param code 验证码
   */
  loginBySmsCode(telephone: string, code: string) {
    const formData = new FormData();
    formData.append("telephone", telephone);
    formData.append("code", code);

    return Axios.post(`${BASE_URL}/token`, formData, {
      auth: OAuthClient,
      params: {
        grant_type: "sms_code"
      },
      message: {
        show: false
      }
    });
  },

  /**
   * 根据用户Token注销用户
   * 不存在及为空的Token均返回注销失败
   *
   * @param token Token
   */
  logout(token: string) {
    return Axios.delete(`${BASE_URL}/logout`, {
      headers: {
        Authorization: token
      }
    });
  },

  /**
   * 根据客户端ID查询单个信息
   *
   * @param clientId 客户端ID
   */
  selectClientByClientId(clientId: string) {
    return Axios.get(`${BASE_URL}/select/client/id/${clientId}`);
  }
};
