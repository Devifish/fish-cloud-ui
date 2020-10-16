<template>
  <a-spin :spinning="state.loading">
    <a-tree
      v-if="!isEmpty(state.treeData)"
      v-model:checkedKeys="state.checkedKeys"
      :treeData="state.treeData"
      :replaceFields="{ title: 'name', key: 'id' }"
      checkable
      checkStrictly
      default-expand-all
    />
  </a-spin>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, onMounted } from "vue";
import { Tree } from "ant-design-vue";
import MenuApi from "@/api/menu";
import RoleApi from "@/api/role";
import { map, toMap } from "@/utils/tree";
import { isEmpty } from "@/utils/common";
import { message } from "ant-design-vue";

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
    const state = reactive({
      loading: false,
      treeData: [] as Array<any>,
      checkedKeys: {
        checked: [],
        halfChecked: []
      }
    });

    async function onLoadData() {
      const { id } = props;
      if (!id) return;

      // 加载数据
      state.loading = true;
      const { data: treeData } = await MenuApi.selectMenuTree();
      const { data: role } = await RoleApi.selectById(id);
      const authorities: Array<string> = role.authorities ?? [];

      // 拼装参数
      state.treeData = map(treeData, item => ({
        ...item,
        disabled: isEmpty(item.permission)
      }));
      state.loading = false;
    }

    async function changeAuthorityHandle() {
      const { id } = props;
      const menuMap = toMap(state.treeData, item => item.id);
      const checkedKeys = [...state.checkedKeys.checked, ...state.checkedKeys.halfChecked];
      const authorities = checkedKeys
        .map(key => menuMap[key].permission)
        .filter(item => typeof item === "string");

      await RoleApi.updateAuthoritiesByRoleId(id, authorities);
      message.success("修改成功")
    }

    onOk(changeAuthorityHandle);
    onMounted(onLoadData);
    return {
      state,
      isEmpty
    };
  }
});
</script>
