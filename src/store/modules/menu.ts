import { Module } from "vuex";
import MenuApi from "@/api/menu";

interface MenuStoreState {
  menuTree: Array<any> | null;
}

const MENU_TREE_STORAGE = "menu-tree";

/**
 * 菜单树转换为列表
 *
 * @param menu 菜单
 */
function tree2list(menu: Array<any>) {
  return menu.reduce((data, item) => {
    const children = item.children;
    if (children?.length > 0) {
      data.push(tree2list(children));
    }

    data.push(item);
    return data;
  }, []);
}

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
  getters: {
    menuList({ menuTree }) {
      return tree2list(menuTree ?? []);
    },
    filterMenu({ menuTree }) {
      return (filter: (menu: any) => boolean) => {
        const recursion = (menu: Array<any>) => {
          for (var item of menu) {
            if (filter(item)) return item;

            const children = item.children;
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
