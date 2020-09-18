<template>
  <a-card title="内容筛选">
    <a-form layout="inline" :model="params">
      <a-form-item label="角色名称">
        <a-input v-model:value="params.name" placeholder="请输入角色名称">
          <template v-slot:prefix><UserOutlined style="color:rgba(0,0,0,.25)"/></template>
        </a-input>
      </a-form-item>
      <a-form-item label="角色编码">
        <a-input v-model:value="params.code" placeholder="请输入角色编码">
          <template v-slot:prefix><UserOutlined style="color:rgba(0,0,0,.25)"/></template>
        </a-input>
      </a-form-item>
      <a-form-item label="权限">
        <a-input v-model:value="params.authority" placeholder="请输入权限">
          <template v-slot:prefix><UserOutlined style="color:rgba(0,0,0,.25)"/></template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" @click="loadData">
          搜索
        </a-button>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" @click="loadData">
          重置
        </a-button>
      </a-form-item>
    </a-form>
  </a-card>
  <a-card title="用户列表">
    <a-table :data-source="list" :loading="state.loading" row-key="id" :bordered="true">
      <a-table-column data-index="name" title="角色名称" align="center" width="15%" />
      <a-table-column data-index="code" title="角色编码" align="center" width="10%" />
      <a-table-column data-index="remark" title="描述" align="center" width="10%" />
      <a-table-column title="权限" align="center" width="10%">
        <template v-slot="{ record }">
          <a-tag v-for="item of record.authorities" :key="item">
            {{ item }}
          </a-tag>
        </template>
      </a-table-column>
      <a-table-column data-index="createTime" title="创建时间" align="center" width="15%" />
      <a-table-column data-index="updateTime" title="更新时间" align="center" width="15%" />
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
import RoleApi from "@/api/role";
import { PageData } from "@/model/page";

export default defineComponent({
  name: "UserList",
  setup() {
    // 页面状态
    const state = reactive({
      loading: true,
      page: PageData.init()
    });

    const params = reactive({
      name: "",
      code: "",
      authority: ""
    });

    // 列表数据
    const list = ref<Array<any>>();

    /**
     * 加载页面数据
     */
    async function loadData() {
      const { data } = await RoleApi.selectPage(state.page, params);

      // 获取数据成功
      state.loading = false;
      list.value = data?.records;
      state.page = PageData.of(data);
    }

    onMounted(loadData);
    return {
      state,
      list,
      params,
      loadData
    };
  }
});
</script>
