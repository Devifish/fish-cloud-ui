<template>
  <div class="home-layout">
    <a-page-header :title="getGreetingText()">
      <div class="home-header-wrap">
        <a-row type="flex">
          <a-col flex="auto">
            <div class="account-avatar">
              <a-avatar :size="72" :src="user?.avatar" />
            </div>
            <div class="account-content">
              <h2>{{ user?.nickname || user?.username }}</h2>
              <span>
                无部门 | 无角色
              </span>
            </div>
          </a-col>
          <a-col flex="300px">
            <a-row :gutter="24">
              <a-col :span="12">
                <a-statistic title="我的任务" :value="0" suffix="个" />
              </a-col>
              <a-col :span="12">
                <a-statistic title="我的审批" :value="0" suffix="个" />
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </div>
    </a-page-header>
    <div class="home-content-wrap">
      <a-row type="flex">
        <a-col flex="auto">
          <div>
            <a-card title="便捷导航" style="height: 200px">
              <template v-slot:extra>
                <a href="#">添加</a>
              </template>
              <a-empty :imageStyle="{ height: '64px' }" />
            </a-card>

            <a-card style="margin-top: 16px; height: 333px">

            </a-card>
          </div>
        </a-col>
        <a-col flex="350px">
          <a-card title="更新日志" style="margin-left: 16px;  height: 550px">
            <a-timeline>
              <a-timeline-item v-for="item of state.changelog" :key="item.message">
                {{ item.message }} ({{ item.data }})
              </a-timeline-item>
            </a-timeline>
          </a-card>
        </a-col>
      </a-row>
      <common-footer />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { CommonFooter } from "@/components";
import Moment from "moment";
import GithubApi from "@/api/github";

export default defineComponent({
  name: "Dashbord",
  components: {
    CommonFooter
  },
  setup() {
    const store = useStore();
    const state = reactive({
      changelog: []
    });

    const user = computed(() => store.state.auth.user);

    function getGreetingText() {
      const time = Moment().format("a");
      return `${time}好，欢迎使用`;
    }

    async function getLastCommits() {
      const data = await GithubApi.getLastCommits(10);

      state.changelog = data.map(({ commit }) => ({
        data: Moment(commit.committer.date).fromNow(),
        message: commit.message
      }));
    }

    onMounted(getLastCommits);
    return {
      state,
      user,
      getGreetingText
    };
  }
});
</script>

<style lang="less">
.home-layout {
  .home-header-wrap {
    .account-avatar {
      display: block;
      float: left;
      width: 72px;
    }
    .account-content {
      display: inline-block;
      margin-left: 16px;
    }
  }
}
</style>
