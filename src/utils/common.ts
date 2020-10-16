import Antd from "ant-design-vue";

/**
 * 校验各种类型数据是否为空
 *
 * @param obj 对象
 */
export function isEmpty(obj: any): boolean {
  if (typeof obj === "string") {
    return obj.length === 0;
  } else if (obj instanceof Array) {
    return obj.length === 0;
  } else if (obj instanceof Set) {
    return obj.size === 0;
  } else if (obj) {
    return false;
  } else {
    return true;
  }
}
