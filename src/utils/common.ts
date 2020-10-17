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

/**
 * 深克隆
 *
 * @param obj 对象
 */
export function deepClone<E extends any>(obj: E): E {
  const json = JSON.stringify(obj);
  return JSON.parse(json);
}

/**
 * 复制参数
 *
 * @param source 来源
 * @param target 目标
 */
export function copy(source: any, target: any) {
  const keys = Object.keys(source);
  for (const key of keys) {
    target[key] = source[key];
  }
}
