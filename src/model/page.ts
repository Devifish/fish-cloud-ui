export interface Page {
  current: number;
  size: number;
}

export class PageData implements Page {
  static readonly DEFAULT_SIZE = 10;
  static readonly DEFAULT_CURRENT = 1;

  current: number;
  size: number;

  constructor(current: number, size: number) {
    this.current = current;
    this.size = size;
  }

  static init(): Page {
    return new PageData(PageData.DEFAULT_CURRENT, PageData.DEFAULT_SIZE);
  }

  static of(pageData: any): Page {
    const size = pageData?.size ?? PageData.DEFAULT_SIZE;
    const current = pageData?.current ?? PageData.DEFAULT_CURRENT;

    return new PageData(current, size);
  }
}
