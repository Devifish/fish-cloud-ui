<template>
  <div>
    <a-row type="flex">
      <a-col flex="auto">
        <div>
          <a-card>
            <p>card content</p>
          </a-card>
          <a-card>
            <p>card content</p>
          </a-card>
        </div>
      </a-col>
      <a-col flex="350px">
        <a-card title="更新日志" style="margin-left: 16px">
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
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import { CommonFooter } from "@/components";
import Moment from "moment";
import GithubApi from "@/api/github";

export default defineComponent({
  name: "Dashbord",
  components: {
    CommonFooter
  },
  setup() {
    const state = reactive({
      changelog: []
    });

    async function getLastCommits() {
      const data = await GithubApi.getLastCommits(10);

      state.changelog = data.map(({ commit }) => ({
        data: Moment(commit.committer.date).fromNow(),
        message: commit.message
      }));
    }

    onMounted(getLastCommits);
    return {
      state
    };
  }
});
</script>
