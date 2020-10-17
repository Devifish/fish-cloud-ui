<template>
  <a-spin :spinning="state.loading">
    <a-form :model="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
      <a-form-item label="角色名称" required>
        <a-input v-model:value="form.name" placeholder="请输入角色名称" />
      </a-form-item>
      <a-form-item label="角色编码" required>
        <a-input v-model:value="form.code" placeholder="请输入角色编码" />
      </a-form-item>
      <a-form-item label="描述">
        <a-textarea
          v-model:value="form.remark"
          placeholder="请输入描述"
          :rows="3"
        />
      </a-form-item>
    </a-form>
  </a-spin>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import { message } from "ant-design-vue";
import RoleApi from "@/api/role";
import { copy } from "@/utils/common";

export default defineComponent({
  name: "RoleEdit",
  props: {
    id: Number,
    onOk: {
      type: Function,
      default: (callback: any) => {}
    }
  },
  setup(props, ctx) {
    const { onOk } = props;
    const state = reactive({
      loading: false
    });

    const form = reactive({
      name: "",
      code: "",
      remark: ""
    });

    async function onLoadData() {
      const { id } = props;
      if (!id) return;

      // 加载数据
      state.loading = true;
      const { data } = await RoleApi.selectById(id);
      copy(data, form, true);
      state.loading = false;
    }

    async function saveDataHandle() {
      const { id } = props;

      // 区分添加与编辑
      if (id) {
        //await RoleApi.update(id, form);
        message.success("修改成功");
      } else {
        //await RoleApi.insert(form);
        message.success("添加成功");
      }
      ctx.emit("success");
    }

    onOk(saveDataHandle);
    onMounted(onLoadData);
    return {
      state,
      form
    };
  }
});
</script>
