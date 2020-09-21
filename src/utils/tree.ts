/**
 * 树转列表
 *
 * @param tree Tree
 * @param children 子节点字段
 */
export function toList(tree: Array<any>, children = "children") {
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
 * 清除空子节点
 *
 * @param tree Tree
 * @param children 子节点字段
 */
export function removeEmptyChildren(tree: Array<any>, children = "children") {
  for (let item of tree) {
    const childrenData = item[children];
    if (childrenData.length > 0) {
      item.children = removeEmptyChildren(childrenData);
    } else {
      delete item[children];
    }
  }
  return tree;
}
