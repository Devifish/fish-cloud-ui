<template>
  <list-table-container title="角色列表" @reload="reload">
    <template v-slot:search>
      <a-form layout="inline" :model="search" @submit="reload">
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
      <a-button type="primary" @click="$router.push('/user/role/add')">
        <template v-slot:icon>
          <plus-outlined />
        </template>
        添加角色
      </a-button>
    </template>

    <a-table
      v-bind="tableProps"
      v-on="tableEvent"
      row-key="id"
      :bordered="true"
      :scroll="{ x: 900 }"
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
            <action-link>
              编辑
            </action-link>
            <a-divider type="vertical" />
            <action-link>
              权限
            </action-link>
            <a-divider type="vertical" />
            <action-link @click="deleteHandle(record)">
              删除
            </action-link>
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
import ActionLink from "@/components/ActionLink.vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import { Modal } from "ant-design-vue";

export default defineComponent({
  name: "UserList",
  components: {
    ListTableContainer,
    ActionLink,
    PlusOutlined
  },
  setup() {
    const { tableProps, tableEvent, load, reload, reset, onLoadData } = useListTable();

    // 请求参数
    const search = reactive({
      name: "",
      code: "",
      authority: ""
    });

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

    // 加载数据
    onLoadData(async page => {
      const { data } = await RoleApi.selectPage(page, search);
      return data;
    });

    return {
      tableProps,
      tableEvent,
      search,
      reload,
      deleteHandle
    };
  }
});
</script>
