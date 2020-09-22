import Axios from "@/library/axios";

const BASE_URL = "/api/upms/menu";

export default {
  /**
   * 根据菜单ID查询菜单数据
   *
   * @param menuId 菜单ID
   */
  selectById(menuId: string) {
    return Axios.get(`${BASE_URL}/select/id/${menuId}`);
  },

  /**
   * 查询菜单树
   * 构建树结构数据
   * 方便前端构建菜单
   */
  selectMenuTree() {
    return Axios.get(`${BASE_URL}/select/menu-tree`);
  },

  /**
   * 查询当前用户的菜单树
   * 构建树结构数据
   * 方便前端构建菜单
   */
  currentMenuTree() {
    return Axios.get(`${BASE_URL}/current/menu-tree`);
  },

  /**
   * 保存菜单数据
   * 包含各项参数校验及数据转换
   *
   * @param data 菜单参数
   */
  insert(data: any) {
    return Axios.post(`${BASE_URL}/insert`, data);
  },

  /**
   * 更新菜单数据
   * 包含各项参数校验及数据转换
   *
   * @param menuId 菜单Id
   * @param data 菜单参数
   */
  update(menuId: string, data: any) {
    return Axios.put(`${BASE_URL}/update/${menuId}`, data);
  },

  /**
   * 删除菜单
   * 必须与子菜单进行解绑
   *
   * @param menuId 菜单ID
   */
  delete(menuId: string) {
    return Axios.delete(`${BASE_URL}/delete/id/${menuId}`);
  }
};
