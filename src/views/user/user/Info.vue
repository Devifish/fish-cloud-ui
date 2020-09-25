<template>
  <a-page-header title="用户详情" @back="$router.back()" />
  <a-card>
    <a-descriptions :column="3" layout="vertical">
      <template v-slot:title>
        <a-avatar :size="64" :src="data?.avatar" />
        <h2>{{ data?.username }}</h2>
      </template>
      <a-descriptions-item label="昵称">
        {{ data?.nickname ?? "未设置" }}
      </a-descriptions-item>
      <a-descriptions-item label="真实姓名">
        {{ data?.realname ?? "未设置" }}
      </a-descriptions-item>
      <a-descriptions-item label="性别">
        <span v-if="data?.sex == 1">男</span>
        <span v-else-if="data?.sex == 2">女</span>
        <span v-else>未设置</span>
      </a-descriptions-item>
      <a-descriptions-item label="生日">
        {{ data?.birthday ?? "未设置" }}
      </a-descriptions-item>
    </a-descriptions>
    <a-divider />
    <a-descriptions title="联系方式" :column="3" layout="vertical">
      <a-descriptions-item label="手机号码">
        {{ data?.telephone ?? "未设置" }}
      </a-descriptions-item>
      <a-descriptions-item label="电子邮箱">
        {{ data?.email ?? "未设置" }}
      </a-descriptions-item>
    </a-descriptions>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import UserApi from "@/api/user";

export default defineComponent({
  name: "UserInfo",
  props: {
    id: String
  },
  setup(props) {
    const route = useRoute();
    const data = ref();

    async function onLoadData() {
      const { id } = route.params;
      if (typeof id !== "string") return;

      const { data: temp } = await UserApi.selectById(id);
      data.value = temp;
    }

    onMounted(onLoadData);
    return {
      data
    };
  }
});
</script>
