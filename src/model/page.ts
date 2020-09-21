const DEFAULT_SIZE = 10;
const DEFAULT_CURRENT = 1;
const DEFAULT_PAGINATION = {
  showSizeChanger: true,
  showLessItems: true,
  pageSizeOptions: ["10", "30", "50", "100"]
};

export interface PageParam {
  current: number;
  size: number;
}

export class PageData implements PageParam {
  records: Array<any>;
  current: number;
  size: number;
  total: number;

  constructor(
    records: Array<any> = [],
    current: number = DEFAULT_CURRENT,
    size: number = DEFAULT_SIZE,
    total: number = records.length
  ) {
    this.records = records;
    this.current = current;
    this.size = size;
    this.total = total;
  }

  reset() {
    this.current = DEFAULT_CURRENT;
    this.size = DEFAULT_SIZE;
    this.records = [];
    this.total = 0;
  }

  toPageParam(): PageParam {
    const { current, size } = this;
    return {
      current,
      size
    };
  }

  toPagination() {
    const { current, size, total } = this;
    return {
      ...DEFAULT_PAGINATION,
      current,
      pageSize: size,
      total
    };
  }

  static of(pageData: any) {
    if (pageData instanceof Array) {
      return new PageData(pageData, DEFAULT_CURRENT, DEFAULT_SIZE);
    } else {
      const { records, current, size, total } = pageData;
      return new PageData(records, current, size, total);
    }
  }
}
