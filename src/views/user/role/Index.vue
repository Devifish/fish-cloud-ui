<template>
  <list-table-container title="角色列表">
    <template v-slot:search>
      <a-form layout="inline" :model="search" @submit="searchHandle">
        <a-form-item label="角色名称">
          <a-input v-model:value="search.name" placeholder="请输入角色名称" />
        </a-form-item>
        <a-form-item label="角色编码">
          <a-input v-model:value="search.code" placeholder="请输入角色编码" />
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
    </template>

    <template v-slot:extra>
      <a-button type="primary">
        <template v-slot:icon>
          <plus-outlined />
        </template>
        添加角色
      </a-button>
    </template>

    <a-table
      row-key="id"
      v-bind="tableProps"
      :bordered="true"
      :scroll="{ x: 900 }"
      @change="tableChangeHandle"
    >
      <a-table-column title="序号" align="center" width="5%">
        <template v-slot="{ index }">
          {{ index + 1 }}
        </template>
      </a-table-column>
      <a-table-column data-index="name" title="角色名称" align="center" width="10%" />
      <a-table-column data-index="code" title="角色编码" align="center" width="10%" />
      <a-table-column data-index="remark" title="描述" align="center" />
      <a-table-column data-index="createTime" title="创建时间" align="center" width="15%" />
      <a-table-column data-index="updateTime" title="更新时间" align="center" width="15%" />
      <a-table-column title="操作" width="200px" fixed="right">
        <template v-slot="{ record }">
          <span>
            <a href="javascript:void(0);">
              编辑
            </a>
            <a-divider type="vertical" />
            <a href="javascript:void(0);" @click="deleteHandle(record)">
              删除
            </a>
          </span>
        </template>
      </a-table-column>
    </a-table>
  </list-table-container>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useListTable } from "@/utils/use";
import RoleApi from "@/api/role";
import ListTableContainer from "@/components/ListTableContainer.vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import { Modal } from "ant-design-vue";

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
      name: "",
      code: "",
      authority: ""
    });

    function searchHandle() {
      reset();
      load();
    }

    function deleteHandle(data: any) {
      Modal.confirm({
        title: "删除角色",
        content: "确认要删除此角色吗？",
        async onOk() {
          await RoleApi.delete(data.id);
          load();
        }
      });
    }

    function tableChangeHandle(pagination: any) {
      const { current, pageSize } = pagination;
      load(current, pageSize);
    }

    // 加载数据
    onLoadData(async page => {
      const { data } = await RoleApi.selectPage(page, search);
      return data;
    });

    return {
      tableProps,
      tableChangeHandle,
      search,
      searchHandle,
      deleteHandle
    };
  }
});
</script>
