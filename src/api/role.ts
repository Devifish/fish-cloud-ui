import Axios from "@/library/axios";
import { PageParam } from "@/model/page";

const BASE_URL = "/api/upms/role";

export default {
  /**
   * 根据角色ID查询单个信息
   *
   * @param roleId 角色ID
   */
  selectById(roleId: string) {
    return Axios.get(`${BASE_URL}/select/id/${roleId}`);
  },

  /**
   * 分页查询角色数据
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
   * 根据角色ID删除角色
   *
   * @param roleId 角色ID
   * @return 是否成功
   */
  delete(roleId: string) {
    return Axios.delete(`${BASE_URL}/delete/id/${roleId}`);
  }
};
