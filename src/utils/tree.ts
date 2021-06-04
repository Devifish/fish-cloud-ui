/**
 * 树转列表
 *
 * @param tree Tree
 * @param children 子节点字段
 */
export function toList(tree: Array<any>, children = "children"): Array<any> {
  return tree.reduce((list, item) => {
    let childrenData = item[children];
    if (childrenData?.length > 0) {
      childrenData = toList(childrenData);
      list = list.concat(childrenData);
    }

    list.push(item);
    return list;
  }, []);
}

/**
 * 树转Map
 *
 * @param tree Tree
 * @param children 子节点字段
 */
export function toMap<E extends keyof any>(
  tree: Array<any>,
  keyGen: (menu: any) => E,
  children = "children"
): Record<E, any> {
  const menuList = toList(tree, children);

  return menuList.reduce((map: any, item: any) => {
    map[keyGen(item)] = item;

    return map;
  }, {});
}

/**
 * 树结构数据的Map实现
 *
 * @param tree Tree
 * @param callback Callback
 * @param children 子节点字段
 */
export function map<E extends any>(
  tree: Array<any>,
  callback: (value: any) => E,
  children = "children"
): Array<E> {
  return tree.map(item => {
    const childrenData = item[children];
    if (childrenData?.length > 0) {
      item[children] = map(childrenData, callback, children);
    }

    return callback(item);
  });
}

/**
 * 树结构数据的Map实现
 *
 * @param tree Tree
 * @param callback Callback
 * @param children 子节点字段
 */
export function filter(
  tree: Array<any>,
  callback: (value: any) => boolean,
  children = "children"
): Array<any> {
  return tree.filter(item => {
    const childrenData = item[children];
    if (childrenData?.length > 0) {
      item[children] = filter(childrenData, callback, children);
    }

    return callback(item);
  })
}

/**
 * 清除空子节点
 *
 * @param tree Tree
 * @param children 子节点字段
 */
export function removeEmptyChildren(tree: Array<any>, children = "children") {
  for (let item of tree) {
    const childrenData = item[children];
    if (!(childrenData instanceof Array)) continue;

    if (childrenData.length > 0) {
      item[children] = removeEmptyChildren(childrenData);
    } else {
      delete item[children];
    }
  }
  return tree;
}
