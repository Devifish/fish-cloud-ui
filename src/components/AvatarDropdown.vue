<template>
  <a-dropdown>
    <span>
      <a-spin :spinning="loading">
        <a-avatar class="account-avatar" :src="avatar" />
        <span v-if="username">{{ username }}</span>
        <span v-else>loading...</span>
      </a-spin>
    </span>
    <template v-slot:overlay>
      <slot />
    </template>
  </a-dropdown>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HeaderAvatarMenu",
  props: {
    avatar: String,
    username: String,
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ["select"]
});
</script>

<style scoped>
.account-avatar {
  margin-right: 8px;
}
</style>
