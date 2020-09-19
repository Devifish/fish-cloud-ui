<template>
  <a-card title="内容筛选">
    <a-form layout="inline" :model="params" @submit="search" ref="searchForm">
      <a-form-item label="用户名">
        <a-input v-model:value="params.username" placeholder="请输入用户名" />
      </a-form-item>
      <a-form-item label="手机号码">
        <a-input v-model:value="params.telephone" placeholder="请输入手机号码" />
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
      :data-source="list"
      :loading="state.loading"
      :bordered="true"
      :scroll="{ x: 1300 }"
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
      <a-table-column data-index="sex" title="性别" align="center" width="5%">
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
import UserApi from "@/api/user";
import { PageData } from "@/model/page";

export default defineComponent({
  name: "UserList",
  setup() {
    // 页面状态
    const state = reactive({
      loading: true,
      page: PageData.init()
    });

    // 请求参数
    const params = reactive({
      username: "",
      telephone: ""
    });

    // 列表数据
    const list = ref<Array<any>>();

    /**
     * 加载页面数据
     */
    async function loadData() {
      const { data } = await UserApi.selectPage(state.page, params);

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
      params,
      list,
      search
    };
  }
});
</script>
