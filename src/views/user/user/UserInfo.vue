<template>
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
    <a-descriptions-item label="部门">
      未设置
    </a-descriptions-item>
    <a-descriptions-item label="角色">
      <template v-if="data?.roles.length > 0">
        <a-tag v-for="item of data?.roles" :key="item.id">
          {{ item.name }}
        </a-tag>
      </template>
      <template v-else>
        未设置
      </template>
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
  <a-divider />
  <a-descriptions title="其他信息" :column="3">
    <a-descriptions-item label="是否锁定">
      <a-switch :checked="data?.locked" disabled />
    </a-descriptions-item>
    <a-descriptions-item label="是否禁用">
      <a-switch :checked="data?.enabled" disabled />
    </a-descriptions-item>
  </a-descriptions>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import UserApi from "@/api/user";
import { useDrawer } from "@/utils/use";

export default defineComponent({
  name: "UserInfo",
  setup() {
    const { data: id } = useDrawer();
    const data = ref();

    async function onLoadData() {
      if (!id.value) return;

      const { data: temp } = await UserApi.selectDetailById(id.value);
      data.value = temp;
    }

    onMounted(onLoadData);
    return {
      data
    };
  }
});
</script>
