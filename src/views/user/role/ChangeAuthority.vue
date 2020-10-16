<template>
  <a-spin :spinning="state.loading">
    <a-tree
      v-if="state.treeData.length > 0"
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
      const menuMap = toMap(state.treeData, item => item.id);
      const checkedKeys = [...state.checkedKeys.checked, ...state.checkedKeys.halfChecked];
      const permission = checkedKeys
        .map(key => menuMap[key].permission)
        .filter(item => typeof item === "string");

      console.log(state.checkedKeys);
      console.log(permission);
    }

    onOk(changeAuthorityHandle);
    onMounted(onLoadData);
    return {
      state
    };
  }
});
</script>
