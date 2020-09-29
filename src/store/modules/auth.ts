import { Module } from "vuex";
import Cookies from "@/library/cookie";
import AuthApi from "@/api/auth";
import UserApi from "@/api/user";

type AuthStoreToken = OAuth2Token | null;

interface AuthStoreState {
  token: AuthStoreToken;
  user: any;
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
    let token: AuthStoreToken = null;

    // 如果存在Token则注入
    const tokenValue = Cookies.get(TOKEN_STORAGE);
    if (tokenValue) {
      token = OAuth2Token.createByTokenString(tokenValue);
    }

    return {
      token,
      user: null
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
    },
    removeToken(state) {
      state.token = null;
      Cookies.remove(TOKEN_STORAGE);
    },
    saveUser(state, data) {
      state.user = data;
    }
  },
  actions: {
    async logout({ state, commit }) {
      const tokenData = state.token?.tokenData();
      if (!tokenData) return;

      try {
        await AuthApi.logout(tokenData.value);
      } finally {
        commit("removeToken");
      }
    },
    async currentUser({ commit }) {
      const { data } = await UserApi.currentUser();

      commit("saveUser", data);
    }
  }
};

export default authModule;
