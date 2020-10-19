<template>
  <a-spin :spinning="tableState.loading" style="width: 100%">
    <a-table
      v-if="!isEmpty(tableState.page.records)"
      v-bind="tableProps"
      row-key="id"
      size="middle"
      :row-selection="rowSelection"
      :pagination="false"
      children-column-name="children"
      bordered
      defaultExpandAllRows
    >
      <a-table-column data-index="name" title="菜单权限" width="35%" />
      <a-table-column title="功能权限">
        <template v-slot="{ record }">
          <template v-if="!isEmpty(getButtons(record.id))">
            <a-checkbox
              v-for="button of getButtons(record.id)"
              :key="button.id"
              v-model:checked="state.selection[button.id]"
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
import MenuApi, { MenuType } from "@/api/menu";
import RoleApi from "@/api/role";
import { map, filter, toList, toMap } from "@/utils/tree";
import { useListTable, useModal } from "@/utils/use";
import { isEmpty, deepClone } from "@/utils/common";
import { message } from "ant-design-vue";

export default defineComponent({
  name: "ChangeAuthority",
  setup() {
    const table = useListTable();
    const { onOk, data } = useModal();
    const state = reactive({
      treeData: [] as Array<any>,
      selection: {}
    });

    const rowSelection = reactive({
      selectedRowKeys: computed(() => {
        const ids = Object.keys(state.selection);
        return ids.filter(id => state.selection[id]).map(key => Number.parseInt(key));
      }),
      getCheckboxProps(record: any) {
        return {
          disabled: isEmpty(record.permission),
          name: record.name
        };
      },
      onSelect(record, selected, selectedRows) {
        state.selection[record.id] = selected;
      }
    });

    // 计算菜单相关数据
    const buttonList = computed(() => {
      const menuList = toList(state.treeData);
      return menuList.filter(item => item.type === MenuType.Button);
    });

    table.onLoadData(async () => {
      const { value: id } = data;
      if (!id) return;

      // 加载数据
      const { data: treeData } = await MenuApi.selectMenuTree();
      const { data: role } = await RoleApi.selectById(id);
      const authorities = role.authorities ?? [];
      const permissionMap = toMap(treeData, item => item.permission);

      // 拼装参数
      state.treeData = deepClone(treeData);
      state.selection = authorities
        .map(item => permissionMap[item])
        .filter(item => !isEmpty(item))
        .reduce((obj, item) => {
          obj[item.id] = true;
          return obj;
        }, {});

      return filter(treeData, item => item.type === MenuType.Menu);
    });

    async function changeAuthorityHandle() {
      const { value: id } = data;
      const menuMap = toMap(state.treeData, item => item.id);
      const authorities = rowSelection.selectedRowKeys
        .map(key => menuMap[key]?.permission)
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
      rowSelection,
      isEmpty,
      getButtons
    };
  }
});
</script>
