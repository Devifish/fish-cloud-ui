<template>
  <a-spin :spinning="tableState.loading" style="width: 100%">
    <a-table
      v-if="!isEmpty(tableState.page.records)"
      v-bind="tableProps"
      row-key="id"
      size="middle"
      :row-selection="state"
      :pagination="false"
      children-column-name="children"
      bordered
      defaultExpandAllRows
    >
      <a-table-column data-index="name" title="菜单权限" width="40%" />
      <a-table-column title="功能权限">
        <template v-slot="{ record }">
          <template v-if="!isEmpty(getButtons(record.id))">
            <a-checkbox
              v-for="button of getButtons(record.id)"
              :key="button.id"
              style="margin-left: 0"
            >
              {{ button.name }}
            </a-checkbox>
          </template>
          <span v-else style="color: #888">无功能</span>
        </template>
      </a-table-column>
    </a-table>
  </a-spin>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, onMounted } from "vue";
import { Tree } from "ant-design-vue";
import MenuApi from "@/api/menu";
import RoleApi from "@/api/role";
import { map, filter, toMap } from "@/utils/tree";
import { useListTable } from "@/utils/use";
import { isEmpty, deepClone } from "@/utils/common";
import { message } from "ant-design-vue";

enum MenuType {
  Menu = 0,
  Button = 1
}

export default defineComponent({
  name: "ChangeAuthority",
  props: {
    id: Number,
    onOk: {
      type: Function,
      default: (callback: any) => {}
    }
  },
  setup(props) {
    const { onOk } = props;
    const table = useListTable();
    const state = reactive({
      treeData: [] as Array<any>,
      selection: []
    });

    // 计算菜单相关数据
    const menuMap = computed(() => toMap(state.treeData, item => item.id));
    const buttonList = computed(() => {
      const menus = Object.values(menuMap.value);
      return menus.filter(item => item.type === MenuType.Button);
    });

    table.onLoadData(async () => {
      const { id } = props;
      if (!id) return;

      // 加载数据
      const { data: treeData } = await MenuApi.selectMenuTree();
      const { data: role } = await RoleApi.selectById(id);
      const authorities: Array<string> = role.authorities ?? [];

      // 拼装参数
      state.treeData = deepClone(treeData);
      return filter(treeData, item => item.type === MenuType.Menu);
    });

    async function changeAuthorityHandle() {
      const { id } = props;
      const authorities = state.selection
        .map(key => menuMap.value[key].permission)
        .filter(item => !isEmpty(item));

      await RoleApi.updateAuthoritiesByRoleId(id, authorities);
      message.success("修改成功");
    }

    function getButtons(menuId: number) {
      const list = buttonList.value;
      return list.filter(item => item.parentId === menuId);
    }

    onOk(changeAuthorityHandle);
    return {
      ...table,
      state,
      isEmpty,
      getButtons
    };
  }
});
</script>
