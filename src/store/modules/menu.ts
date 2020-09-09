import { Module } from "vuex";
import MenuApi from "@/api/menu";

interface MenuStoreState {
  menuTree: any | null;
}

const MENU_TREE_STORAGE = "menu-tree";

const menuModule: Module<MenuStoreState, any> = {
  namespaced: true,
  state() {
    let menuTree = null;

    // 如果存在菜单数据则加载
    const mentTreeData = sessionStorage.getItem(MENU_TREE_STORAGE);
    if (mentTreeData) {
      menuTree = JSON.parse(mentTreeData);
    }

    return {
      menuTree
    };
  },
  mutations: {
    saveMenuTree(state, data) {
      state.menuTree = data;

      sessionStorage.setItem(MENU_TREE_STORAGE, JSON.stringify(data));
    }
  },
  actions: {
    async loadMenu({ commit }) {
      const { data } = await MenuApi.currentMenuTree();
      console.log(data);

      // 保存数据
      commit("saveMenuTree", data);
    }
  }
};

export default menuModule;
