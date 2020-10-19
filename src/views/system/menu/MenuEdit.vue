<template>
  <a-spin :spinning="state.loading">
    <a-form :model="form">
      <a-form-item label="菜单名称" required>
        <a-input v-model:value="form.name" placeholder="请输入菜单名称" />
      </a-form-item>
      <a-form-item label="菜单URL">
        <a-input v-model:value="form.url" placeholder="请输入菜单路径" />
      </a-form-item>
      <a-form-item label="授权编码">
        <a-input v-model:value="form.permission" placeholder="请输入授权编码" />
      </a-form-item>
      <a-form-item label="菜单类型">
        <a-radio-group v-model:value="form.type">
          <a-radio :value="MenuType.Menu">
            菜单
          </a-radio>
          <a-radio :value="MenuType.Button">
            按钮
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="父级菜单">
        <a-tree-select
          v-model:value="form.parentId"
          :tree-data="state.treeData"
          :replaceFields="{ title: 'name', key: 'id', value: 'id' }"
          placeholder="请选择父级菜单"
        />
      </a-form-item>
      <a-form-item label="排序值">
        <a-input-number
          v-model:value="form.sort"
          :defaultValue="0"
          placeholder="请输入排序值"
          style="width: 100%"
        />
      </a-form-item>
    </a-form>
  </a-spin>
</template>

<script lang="ts">
import { defineComponent, inject, reactive, computed, onMounted } from "vue";
import { message } from "ant-design-vue";
import MenuApi, { MenuType } from "@/api/menu";
import { copy } from "@/utils/common";
import { useDrawer } from "@/utils/use";

export default defineComponent({
  name: "MenuEdit",
  setup(props, ctx) {
    const { onOk, data } = useDrawer();
    const menuListState: any = inject("MenuListState");
    const state = reactive({
      treeData: computed(() => menuListState.page.records),
      loading: false
    });

    const form = reactive({
      name: "",
      url: "",
      permission: "",
      type: 0,
      parentId: null,
      sort: 0
    });

    async function onLoadData() {
      const id = data.value;
      if (!id) return;

      // 加载菜单数据
      state.loading = true;
      const { data: menuData } = await MenuApi.selectById(id);
      copy(menuData, form, true);
      state.loading = false;
    }

    async function saveDataHandle() {
      const id = data.value;

      // 区分添加与编辑
      if (id) {
        await MenuApi.update(id, form);
        message.success("修改成功");
      } else {
        await MenuApi.insert(form);
        message.success("添加成功");
      }
      ctx.emit("success");
    }

    onOk(saveDataHandle);
    onMounted(onLoadData);
    return {
      state,
      form,
      MenuType
    };
  }
});
</script>
