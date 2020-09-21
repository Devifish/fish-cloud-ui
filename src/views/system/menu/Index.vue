<template>
  <list-table-container title="菜单列表">
    <template v-slot:extra>
      <a-button type="primary">
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
          <span v-if="text === 0">菜单</span>
          <span v-else-if="text === 1">按钮</span>
          <span v-else>其他</span>
        </template>
      </a-table-column>
      <a-table-column data-index="sort" title="排序" align="center" width="10%" />
      <a-table-column title="操作" width="200px" fixed="right">
        <template v-slot="{ record }">
          <span>
            <a @click="deleteHandle(record)">编辑</a>
            <a-divider type="vertical" />
            <a @click="deleteHandle(record)">禁用</a>
            <a-divider type="vertical" />
            <a @click="deleteHandle(record)">删除</a>
          </span>
        </template>
      </a-table-column>
    </a-table>
  </list-table-container>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import { useListTable } from "@/utils/use";
import MenuApi from "@/api/menu";
import ListTableContainer from "@/components/ListTableContainer.vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import { removeEmptyChildren } from "@/utils/tree";

export default defineComponent({
  name: "MenuList",
  components: {
    ListTableContainer,
    PlusOutlined
  },
  setup() {
    const { tableProps, load, reset, onLoadData } = useListTable();

    async function deleteHandle(data: any) {
      load();
    }

    // 加载数据
    onLoadData(async () => {
      const { data } = await MenuApi.selectMenuTree();
      return removeEmptyChildren(data);
    });

    return {
      tableProps,
      deleteHandle
    };
  }
});
</script>
