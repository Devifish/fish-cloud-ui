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

  <a-card title="角色列表">
    <a-table
      row-key="id"
      :loading="state.loading"
      :data-source="state.page.records"
      :pagination="state.page.toPagination()"
      :bordered="true"
    >
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
import { defineComponent, reactive, onMounted } from "vue";
import RoleApi from "@/api/role";
import { PageData } from "@/model/page";

export default defineComponent({
  name: "UserList",
  setup() {
    // 页面状态
    const state = reactive({
      loading: false,
      page: new PageData()
    });

    // 请求参数
    const params = reactive({
      name: "",
      code: "",
      authority: ""
    });

    /**
     * 加载页面数据
     */
    async function loadData() {
      state.loading = true;
      const page = state.page.toPageParam();
      const { data } = await RoleApi.selectPage(page, params);

      // 获取数据成功
      state.loading = false;
      state.page = PageData.of(data);
    }

    function search() {
      state.page.reset();
      loadData();
    }

    onMounted(loadData);
    return {
      state,
      params,
      search
    };
  }
});
</script>
