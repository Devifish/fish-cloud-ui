import { reactive, ref, toRefs, onMounted } from "vue";
import { PageData, PageParam } from "@/model/page";

export type LoadDataCallBack = (page: PageParam) => Promise<any>;

export function useListTable() {
  const state = reactive({
    loading: false,
    page: new PageData()
  });

  let onLoadDataCallback: LoadDataCallBack = async () => [];

  function onLoadData(callback: LoadDataCallBack) {
    onLoadDataCallback = callback;
  }

  async function load() {
    state.loading = true;
    const page = state.page.toPageParam();
    const data = await onLoadDataCallback(page);

    // 获取数据成功
    state.loading = false;
    state.page = PageData.of(data);
  }

  function tableChangeHandle(pagination: any) {
    const { current, pageSize: size } = pagination;
    const page = state.page;

    // 修改分页参数并更新数据
    page.current = current;
    page.size = size;
    load();
  }

  function reset() {
    state.loading = false;
    state.page.reset();
  }

  onMounted(load);
  return {
    ...toRefs(state),
    onLoadData,
    load,
    tableChangeHandle,
    reset
  };
}
