<template>
  <list-table-container title="菜单列表" @reload="reload">
    <template v-slot:extra>
      <a-button type="primary" @click="$refs['roleEdit'].open()">
        <template v-slot:icon>
          <plus-outlined />
        </template>
        添加菜单
      </a-button>
    </template>

    <a-spin :spinning="tableState.loading" style="width: 100%">
      <a-table
        v-if="tableState.page.records.length > 0"
        v-bind="tableProps"
        row-key="id"
        :pagination="false"
        :scroll="{ x: 900 }"
        children-column-name="children"
        bordered
        defaultExpandAllRows
      >
        <a-table-column data-index="name" title="名称" width="20%" />
        <a-table-column data-index="url" title="路径" />
        <a-table-column data-index="permission" title="权限" align="center" width="10%" />
        <a-table-column data-index="type" title="类型" align="center" width="10%">
          <template v-slot="{ text }">
            <a-tag v-if="text === 0" color="blue">菜单</a-tag>
            <a-tag v-else-if="text === 1" color="green">按钮</a-tag>
            <a-tag v-else>其他</a-tag>
          </template>
        </a-table-column>
        <a-table-column data-index="sort" title="排序" align="center" width="10%" />
        <a-table-column title="操作" width="200px" fixed="right">
          <template v-slot="{ record }">
            <span>
              <action-link @click="$refs['roleEdit'].open(record.id)">
                编辑
              </action-link>
              <a-divider type="vertical" />
              <action-link @click="changeMenuState(record)">
                {{ record.enable ? "禁用" : "启用" }}
              </action-link>
              <a-divider type="vertical" />
              <action-link @click="deleteHandle(record)">
                删除
              </action-link>
            </span>
          </template>
        </a-table-column>
      </a-table>
    </a-spin>
  </list-table-container>

  <common-modal title="添加/修改菜单" :width="700" okText="保存" ref="roleEdit">
    <template v-slot="{ data, onOk }">
      <menu-edit :id="data" :onOk="onOk" @success="load" />
    </template>
  </common-modal>
</template>

<script lang="ts">
import { defineComponent, provide } from "vue";
import { useListTable } from "@/utils/use";
import MenuApi from "@/api/menu";
import { ListTableContainer, ActionLink, CommonModal } from "@/components";
import { Modal } from "ant-design-vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import { removeEmptyChildren } from "@/utils/tree";
import MenuEdit from "./MenuEdit.vue";

export default defineComponent({
  name: "MenuList",
  components: {
    ListTableContainer,
    ActionLink,
    CommonModal,
    MenuEdit,
    PlusOutlined
  },
  setup() {
    const table = useListTable();
    provide("MenuListState", table.tableState);

    // 加载数据
    table.onLoadData(async () => {
      const { data } = await MenuApi.selectMenuTree();
      return removeEmptyChildren(data);
    });

    async function changeMenuState(data: any) {
      await MenuApi.update(data.id, { ...data, enable: !data.enable });
      table.load();
    }

    function deleteHandle(data: any) {
      Modal.confirm({
        title: "删除菜单",
        content: "确认要删除此菜单吗？",
        async onOk() {
          await MenuApi.delete(data.id);
          table.load();
        }
      });
    }

    return {
      ...table,
      changeMenuState,
      deleteHandle
    };
  }
});
</script>
