import { Module } from "vuex";
import { toList } from "@/utils/tree";
import MenuApi from "@/api/menu";

interface MenuStoreState {
  menuTree: Array<any>;
}

const MENU_TREE_STORAGE = "menu-tree";

const menuModule: Module<MenuStoreState, any> = {
  namespaced: true,
  state() {
    let menuTree = [];

    // 如果存在菜单数据则加载
    const mentTreeData = sessionStorage.getItem(MENU_TREE_STORAGE);
    if (mentTreeData) {
      menuTree = JSON.parse(mentTreeData);
    }

    return {
      menuTree
    };
  },
  getters: {
    menuList({ menuTree }) {
      return toList(menuTree);
    },
    menuMap(state, { menuList }) {
      return (keyGen: (menu: any) => any) => {
        const data = menuList.reduce((map: any, item: any) => {
          map[keyGen(item)] = item;

          return map;
        }, {});

        return data;
      };
    },
    filterMenu({ menuTree }) {
      return (filter: (menu: any) => boolean) => {
        const recursion = (menu: Array<any>) => {
          for (var item of menu) {
            if (filter(item)) return item;

            // 如果存在子菜单则递归一次
            const { children } = item;
            if (children?.length > 0) {
              const callback: any = recursion(children);
              if (callback) return callback;
            }
          }
          return null;
        };

        return recursion(menuTree ?? []);
      };
    }
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

      // 保存数据
      commit("saveMenuTree", data);
    }
  }
};

export default menuModule;
