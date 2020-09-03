export interface PathMatcher {
  /**
   * 是否匹配传入的路径
   * 存在返回 true
   *
   * @param path 路径
   */
  match(path: string): boolean;
}

/**
 * Ant样式路径匹配器
 * 可用于匹配路径是否存在
 */
class AntPathMatcher implements PathMatcher {
  private pathMatcherRegexp: Array<RegExp>;

  constructor(urls: Array<string>) {
    this.pathMatcherRegexp = urls.map(item => {
      if (item.includes("/**")) {
        item = item.replaceAll("/**", ".*");
      }
      if (item.includes("/*")) {
        item = item.replaceAll("/*", "/\\w+");
      }

      return new RegExp(`^${item}$`);
    });
  }

  match(path: string): boolean {
    return this.pathMatcherRegexp.some(regexp => regexp.test(path));
  }
}

export function createPathMatcher(urls: Array<string>): PathMatcher {
  return new AntPathMatcher(urls);
}
