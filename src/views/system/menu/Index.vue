<template>
  <list-table-container title="菜单列表" @reload="reload">
    <template v-slot:extra>
      <a-button type="primary" @click="$router.push('/system/menu/add')">
        <template v-slot:icon>
          <plus-outlined />
        </template>
        添加菜单
      </a-button>
    </template>

    <a-table
      row-key="id"
      v-bind="tableProps"
      :pagination="false"
      :bordered="true"
      :scroll="{ x: 900 }"
      children-column-name="children"
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
            <action-link :to="`/system/menu/edit/${record.id}`">
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
  </list-table-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useListTable } from "@/utils/use";
import MenuApi from "@/api/menu";
import ListTableContainer from "@/components/ListTableContainer.vue";
import ActionLink from "@/components/ActionLink.vue";
import { Modal } from "ant-design-vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import { removeEmptyChildren } from "@/utils/tree";

export default defineComponent({
  name: "MenuList",
  components: {
    ListTableContainer,
    ActionLink,
    PlusOutlined
  },
  setup() {
    const table = useListTable();

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
