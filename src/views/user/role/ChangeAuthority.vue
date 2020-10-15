<template>
  <a-spin :spinning="state.loading">
    <a-tree
      v-if="state.treeData.length > 0"
      v-model:checkedKeys="state.checkedKeys"
      :treeData="state.treeData"
      :replaceFields="{ title: 'name', key: 'id' }"
      checkable
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
      checkedKeys: [] as Array<any>
    });

    async function onLoadData() {
      const { id } = props;
      if (!id) return;

      // 加载数据
      state.loading = true;
      const { data: treeData } = await MenuApi.selectMenuTree();
      const { data: userRoles } = await RoleApi.selectById(id);

      state.treeData = map(treeData, item => {
        return {
          ...item,
          disabled: item.permission ? false : true
        };
      });
      state.loading = false;
    }

    async function changeAuthorityHandle() {
      const menuMap = toMap(state.treeData, item => item.id);
      const permission = state.checkedKeys
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
