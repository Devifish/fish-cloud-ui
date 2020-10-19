import { reactive, Ref, inject, computed, onMounted } from "vue";
import { PageData, PageParam } from "@/model/page";

export type LoadDataCallBack = (page: PageParam) => Promise<any>;

export function useListTable() {
  const state = reactive({
    loading: false,
    page: new PageData()
  });

  const tableProps = computed(() => ({
    loading: state.loading,
    dataSource: state.page.records,
    pagination: state.page.toPagination()
  }));

  let onLoadDataCallback: LoadDataCallBack = async () => [];

  function onLoadData(callback: LoadDataCallBack) {
    onLoadDataCallback = callback;
  }

  async function load(current?: number, size?: number) {
    const page = state.page;
    if (current) page.current = current;
    if (size) page.size = size;

    // 加载数据
    state.loading = true;
    const data = await onLoadDataCallback(page.toPageParam());

    // 获取数据成功
    state.loading = false;
    state.page = PageData.of(data);
  }

  function reload() {
    reset();
    load();
  }

  function tableChangeHandle(pagination: any) {
    const { current, pageSize } = pagination;
    load(current, pageSize);
  }

  function reset() {
    state.loading = false;
    state.page.reset();
  }

  onMounted(load);
  return {
    tableState: state,
    tableProps,
    tableEvent: {
      change: tableChangeHandle
    },
    onLoadData,
    load,
    reload,
    reset
  };
}

export const CommonDrawerData = Symbol();

export interface DrawerData {
  onOk: (callback: () => Promise<void>) => void;
  close: () => void;
  data: Ref<any>;
}

export function useDrawer(): DrawerData {
  const drawer = inject<DrawerData>(CommonDrawerData);
  if (!drawer) {
    throw new Error("请在CommonDrawer的组件内使用");
  }

  return drawer;
}
