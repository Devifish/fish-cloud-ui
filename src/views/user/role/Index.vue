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
      <a-button type="primary" @click="$refs['roleEdit'].open()">
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
            <action-link @click="$refs['roleEdit'].open(record.id)">
              编辑
            </action-link>
            <a-divider type="vertical" />
            <action-link @click="$refs['changeAuthority'].open(record.id)">
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

  <common-modal title="添加/修改角色" :width="700" okText="保存" ref="roleEdit">
    <template v-slot="{ data, onOk }">
      <role-edit :id="data" :onOk="onOk" @success="load" />
    </template>
  </common-modal>

  <common-modal title="修改权限" okText="保存" ref="changeAuthority">
    <template v-slot="{ data, onOk }">
      <change-authority :id="data" :onOk="onOk" />
    </template>
  </common-modal>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useListTable } from "@/utils/use";
import { ListTableContainer, ActionLink, CommonModal } from "@/components";
import { PlusOutlined } from "@ant-design/icons-vue";
import { Modal } from "ant-design-vue";
import RoleApi from "@/api/role";
import RoleEdit from "./RoleEdit.vue";
import ChangeAuthority from "./ChangeAuthority.vue";

export default defineComponent({
  name: "UserList",
  components: {
    ListTableContainer,
    ActionLink,
    CommonModal,
    RoleEdit,
    ChangeAuthority,
    PlusOutlined
  },
  setup() {
    const table = useListTable();
    const search = reactive({
      name: "",
      code: "",
      authority: ""
    });

    // 加载数据
    table.onLoadData(async page => {
      const { data } = await RoleApi.selectPage(page, search);
      return data;
    });

    function deleteHandle(data: any) {
      Modal.confirm({
        title: "删除角色",
        content: "确认要删除此角色吗？",
        async onOk() {
          await RoleApi.delete(data.id);
          table.load();
        }
      });
    }

    return {
      ...table,
      search,
      deleteHandle
    };
  }
});
</script>
