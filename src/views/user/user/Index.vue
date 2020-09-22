<template>
  <list-table-container title="用户列表">
    <template v-slot:search>
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
    </template>

    <template v-slot:extra>
      <a-button type="primary">
        <template v-slot:icon>
          <plus-outlined />
        </template>
        添加用户
      </a-button>
    </template>

    <a-table
      row-key="id"
      v-bind="tableProps"
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
            <a @click="deleteHandle(record)">删除</a>
          </span>
        </template>
      </a-table-column>
    </a-table>
  </list-table-container>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useListTable } from "@/utils/use";
import UserApi from "@/api/user";
import ListTableContainer from "@/components/ListTableContainer.vue";
import { Modal } from "ant-design-vue";
import { PlusOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  name: "UserList",
  components: {
    ListTableContainer,
    PlusOutlined
  },
  setup() {
    const { tableProps, load, reset, onLoadData } = useListTable();

    // 请求参数
    const search = reactive({
      username: "",
      telephone: ""
    });

    function searchHandle() {
      reset();
      load();
    }

    function deleteHandle(data: any) {
      Modal.confirm({
        title: "删除用户",
        content: "确认要删除此用户吗？",
        async onOk() {
          await UserApi.delete(data.id);
          await load();
        }
      });
    }

    function tableChangeHandle(pagination: any) {
      const { current, pageSize } = pagination;
      load(current, pageSize);
    }

    // 加载数据
    onLoadData(async page => {
      const { data } = await UserApi.selectPage(page, search);
      return data;
    });

    return {
      tableProps,
      search,
      tableChangeHandle,
      searchHandle,
      deleteHandle
    };
  }
});
</script>
