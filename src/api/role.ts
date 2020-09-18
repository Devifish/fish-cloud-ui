import Axios from "@/library/axios";
import { Page } from "@/model/page";

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
  selectPage(page: Page, params: any) {
    return Axios.get(`${BASE_URL}/select/page`, {
      params: {
        ...page,
        ...params
      }
    });
  }

}
