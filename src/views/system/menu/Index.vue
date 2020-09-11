<template>
  <a-card title="菜单列表">
    <a-table :data-source="list" :loading="state.loading" row-key="id" children-column-name="children">
      <a-table-column data-index="name" title="名称" width="20%" />
      <a-table-column data-index="url" title="路径" width="35%" />
      <a-table-column data-index="permission" title="权限" width="10%" />
      <a-table-column data-index="type" title="类型" width="10%" />
      <a-table-column data-index="sort" title="排序" width="10%" />
      <a-table-column title="操作" width="10%">
        <template v-slot="{ record }">
          <span>
            <a @click="deleteMenu(record)">删除</a>
          </span>
        </template>
      </a-table-column>
    </a-table>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import MenuApi from "@/api/menu";

export default defineComponent({
  name: "MenuList",
  setup() {
    // 页面状态
    const state = reactive({
      loading: true
    });

    // 列表数据
    const list = ref<Array<any>>();

    /**
     * 初始化页面
     */
    async function init() {
      const { data } = await MenuApi.selectMenuTree();

      // 获取数据成功
      state.loading = false;
      list.value = data;
    }

    /**
     * 删除菜单
     *
     * @param 菜单数据
     */
    async function deleteMenu(data: any) {
      console.log(data);
    }

    onMounted(init);
    return {
      state,
      list,
      deleteMenu
    };
  }
});
</script>
