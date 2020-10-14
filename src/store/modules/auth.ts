import { Module } from "vuex";
import Cookies from "@/library/cookie";
import AuthApi from "@/api/auth";
import UserApi from "@/api/user";
import Router from "@/router";
import { LOGIN_PAGE_NAME } from "@/router/auth";

type AuthStoreToken = OAuth2Token | null;

interface AuthStoreState {
  token: AuthStoreToken;
  user: any;
}

interface SaveTokenData {
  tokenData: any;
  expire: boolean;
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
    saveToken(state, data: SaveTokenData) {
      const { access_token, token_type, expires_in } = data.tokenData;
      const token = new OAuth2Token(access_token, token_type);
      const tokenValue = token.tokenData().value;

      state.token = token;
      if (data.expire) {
        const expires = new Date(Date.now() + expires_in * 1000);
        Cookies.set(TOKEN_STORAGE, tokenValue, { expires });
      } else {
        Cookies.set(TOKEN_STORAGE, tokenValue);
      }
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

        // 完成注销后返回登录页
        Router.push({ name: LOGIN_PAGE_NAME });
      }
    },
    async currentUser({ commit }) {
      const { data } = await UserApi.currentUser();

      commit("saveUser", data);
    }
  }
};

export default authModule;
