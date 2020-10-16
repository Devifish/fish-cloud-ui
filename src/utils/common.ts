import Antd from "ant-design-vue";

/**
 * 校验各种类型数据是否为空
 *
 * @param obj 对象
 */
export function isEmpty(obj: any): boolean {
  if (obj) return false;
  else if (typeof obj === "string" && obj.length > 0) return false;
  else if (obj instanceof Array && obj.length > 0) return false;
  else if (obj instanceof Set && obj.size > 0) return false;
  else return true;
}
