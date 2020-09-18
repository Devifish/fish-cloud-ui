<template>
  <a-card title="内容筛选"> </a-card>
  <a-card title="用户列表">
    <a-table
      :data-source="list"
      :loading="state.loading"
      row-key="id"
      :bordered="true"
    >
    <a-table-column title="序号" align="center" width="5%"></a-table-column>
      <a-table-column title="用户名" width="15%">
        <template v-slot="{ record }">
          <a-avatar :src="record.avatar" />
          {{ record.username }}
        </template>
      </a-table-column>
      <a-table-column data-index="nickname" title="昵称" align="center" width="10%" />
      <a-table-column data-index="realname" title="真实姓名" align="center" width="10%" />
      <a-table-column data-index="sex" title="性别" align="center" width="10%" />
      <a-table-column data-index="telephone" title="手机号码" align="center" width="15%" />
      <a-table-column data-index="email" title="电子邮箱" align="center" width="15%" />
      <a-table-column data-index="birthday" title="生日" align="center" width="10%" />
      <a-table-column title="操作" width="10%">
        <template v-slot="{ record }">
          <span>
            <a>删除</a>
          </span>
        </template>
      </a-table-column>
    </a-table>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from "vue";
import UserApi from "@/api/user";
import { PageData } from "@/model/page";

export default defineComponent({
  name: "UserList",
  setup() {
    // 页面状态
    const state = reactive({
      loading: true,
      page: PageData.init()
    });

    // 列表数据
    const list = ref<Array<any>>();

    /**
     * 加载页面数据
     */
    async function loadData() {
      const { data } = await UserApi.selectPage(state.page, {});

      // 获取数据成功
      state.loading = false;
      list.value = data?.records;
      state.page = PageData.of(data);
    }

    onMounted(loadData);
    return {
      state,
      list
    };
  }
});
</script>
