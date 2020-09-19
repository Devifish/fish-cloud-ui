<template>
  <a-card title="内容筛选">
    <a-form layout="inline" :model="search" @submit="searchHandle" ref="searchForm">
      <a-form-item label="用户名">
        <a-input v-model:value="search.username" placeholder="请输入用户名" />
      </a-form-item>
      <a-form-item label="手机号码">
        <a-input v-model:value="search.telephone" placeholder="请输入手机号码" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">
          搜索
        </a-button>
        <a-button style="margin-left: 10px" @click="$refs.searchForm.resetFields()">
          重置
        </a-button>
      </a-form-item>
    </a-form>
  </a-card>

  <a-card title="用户列表">
    <a-table
      row-key="id"
      :loading="state.loading"
      :data-source="state.page.records"
      :pagination="state.page.toPagination()"
      :bordered="true"
      :scroll="{ x: 1300 }"
      @change="tableChangeHandle"
    >
      <a-table-column title="序号" align="center" width="5%">
        <template v-slot="{ index }">
          {{ index + 1 }}
        </template>
      </a-table-column>
      <a-table-column title="用户名" width="15%">
        <template v-slot="{ record }">
          <a-avatar :src="record.avatar" />
          {{ record.username }}
        </template>
      </a-table-column>
      <a-table-column data-index="nickname" title="昵称" align="center" width="10%" />
      <a-table-column data-index="realname" title="真实姓名" align="center" width="10%" />
      <a-table-column data-index="sex" title="性别" align="center" width="10%">
        <template v-slot="{ text }">
          <a-tag v-if="text == 1" color="blue">男</a-tag>
          <a-tag v-else-if="text == 2" color="red">女</a-tag>
          <a-tag v-else>未设置</a-tag>
        </template>
      </a-table-column>
      <a-table-column data-index="telephone" title="手机号码" align="center" width="15%" />
      <a-table-column data-index="email" title="电子邮箱" align="center" width="15%" />
      <a-table-column data-index="birthday" title="生日" align="center" width="10%" />
      <a-table-column title="操作" width="200px" fixed="right">
        <template v-slot="{ record }">
          <span>
            <a>详情</a>
            <a-divider type="vertical" />
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
import UserApi from "@/api/user";
import { PageData, PageParam } from "@/model/page";

export default defineComponent({
  name: "UserList",
  setup() {
    // 页面状态
    const state = reactive({
      loading: false,
      page: new PageData()
    });

    // 请求参数
    const search = reactive({
      username: "",
      telephone: ""
    });

    /**
     * 加载页面数据
     */
    async function loadData(param = state.page.toPageParam()) {
      state.loading = true;
      const { data } = await UserApi.selectPage(param, search);

      // 获取数据成功
      state.loading = false;
      state.page = PageData.of(data);
    }

    function searchHandle() {
      state.page.reset();
      loadData();
    }

    function tableChangeHandle(pagination: any) {
      const { current, pageSize: size } = pagination;

      loadData({ current, size });
    }

    onMounted(loadData);
    return {
      state,
      search,
      searchHandle,
      tableChangeHandle
    };
  }
});
</script>
