import { Module } from "vuex";
import Cookies from "js-cookie";

interface AuthStoreState {
  token: OAuth2Token | null;
}

export class OAuth2Token {
  static readonly TOKEN_HEADER = "Authorization";

  accessToken: string;
  tokenType: string;

  constructor(accessToken: string, tokenType: string) {
    this.accessToken = accessToken;
    this.tokenType = tokenType;
  }

  tokenData() {
    const tokenValue = `${this.tokenType} ${this.accessToken}`;
    return {
      header: OAuth2Token.TOKEN_HEADER,
      value: tokenValue
    };
  }

  static createByTokenString(token: string) {
    const data = token.split(" ");
    if (data.length != 2) throw new Error();

    return new OAuth2Token(data[1], data[0]);
  }
}

// Token存储键名
const TOKEN_STORAGE = OAuth2Token.TOKEN_HEADER;

// 授权模块
const authModule: Module<AuthStoreState, any> = {
  namespaced: true,
  state() {
    let token = null;

    // 如果存在Token则注入
    const tokenValue = Cookies.get(TOKEN_STORAGE);
    if (tokenValue) {
      token = OAuth2Token.createByTokenString(tokenValue);
    }

    return {
      token
    };
  },
  getters: {
    isLogin(state) {
      return state.token != null;
    }
  },
  mutations: {
    saveToken(state, data) {
      const { access_token, token_type, expires_in } = data;
      const token = new OAuth2Token(access_token, token_type);
      const tokenValue = token.tokenData().value;

      Cookies.set(TOKEN_STORAGE, tokenValue);
      state.token = token;
    }
  }
};

export default authModule;
