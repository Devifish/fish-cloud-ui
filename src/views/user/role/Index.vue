<template>
  <a-card title="内容筛选">
    <a-form layout="inline" :model="params" @submit="search">
      <a-form-item label="角色名称">
        <a-input v-model:value="params.name" placeholder="请输入角色名称" />
      </a-form-item>
      <a-form-item label="角色编码">
        <a-input v-model:value="params.code" placeholder="请输入角色编码" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">
          搜索
        </a-button>
        <a-button style="margin-left: 10px">
          重置
        </a-button>
      </a-form-item>
    </a-form>
  </a-card>
  <a-card title="用户列表">
    <a-table :data-source="list" :loading="state.loading" row-key="id" :bordered="true">
      <a-table-column title="序号" align="center" width="5%">
        <template v-slot="{ index }">
          {{ index + 1 }}
        </template>
      </a-table-column>
      <a-table-column data-index="name" title="角色名称" align="center" width="10%" />
      <a-table-column data-index="code" title="角色编码" align="center" width="10%" />
      <a-table-column data-index="remark" title="描述" align="center" width="20%" />
      <a-table-column data-index="createTime" title="创建时间" align="center" width="15%" />
      <a-table-column data-index="updateTime" title="更新时间" align="center" width="15%" />
      <a-table-column title="操作" width="10%">
        <template v-slot="{ record }">
          <span>
            <a>编辑</a>
            <a-divider type="vertical" />
            <a>删除</a>
          </span>
        </template>
      </a-table-column>
    </a-table>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from "vue";
import RoleApi from "@/api/role";
import { PageData } from "@/model/page";

export default defineComponent({
  name: "UserList",
  setup() {
    // 页面状态
    const state = reactive({
      loading: false,
      page: PageData.init()
    });

    // 请求参数
    const params = reactive({
      name: "",
      code: "",
      authority: ""
    });

    // 列表数据
    const list = ref<Array<any>>();

    /**
     * 加载页面数据
     */
    async function loadData() {
      state.loading = true;
      const { data } = await RoleApi.selectPage(state.page, params);

      // 获取数据成功
      state.loading = false;
      list.value = data?.records;
      state.page = PageData.of(data);
    }

    function search() {
      state.page = PageData.init();
      loadData();
    }

    onMounted(loadData);
    return {
      state,
      list,
      params,
      search
    };
  }
});
</script>
