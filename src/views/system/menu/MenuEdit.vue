<template>
  <a-spin :spinning="state.loading">
    <a-form :model="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
      <a-form-item label="菜单名称">
        <a-input v-model:value="form.name" placeholder="请输入菜单名称" />
      </a-form-item>
      <a-form-item label="菜单路径">
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
    </a-form>
  </a-spin>
</template>

<script lang="ts">
import { defineComponent, inject, reactive, computed, onMounted } from "vue";
import { message } from "ant-design-vue";
import MenuApi from "@/api/menu";
import { copy } from "@/utils/common";

enum MenuType {
  Menu = 0,
  Button = 1
}

export default defineComponent({
  name: "MenuEdit",
  props: {
    id: Number,
    onOk: {
      type: Function,
      default: (callback: any) => {}
    }
  },
  setup(props) {
    const { onOk } = props;
    const menuListState: any = inject("MenuListState");
    const state = reactive({
      treeData: computed(() => menuListState.page.records),
      loading: false
    });

    const form = reactive({
      name: "",
      url: "",
      permission: "",
      type: -1,
      parentId: null
    });

    async function onLoadData() {
      const { id } = props;
      if (!id) return;

      // 加载菜单数据
      state.loading = true;
      const { data } = await MenuApi.selectById(id);
      copy(data, form, true);
      state.loading = false;
    }

    async function menuEditHandle() {
      const { id } = props;

      await MenuApi.update(id, form);
      message.success("修改成功");
    }

    onOk(menuEditHandle);
    onMounted(onLoadData);
    return {
      state,
      form,
      MenuType
    };
  }
});
</script>
