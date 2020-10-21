<template>
  <a-dropdown>
    <span class="avatar-dropdown">
      <a-spin :spinning="loading">
        <a-avatar class="account-avatar" :src="avatar" />
        <div class="account-name">
          <span  v-if="username">{{ username }}</span>
          <span v-else>loading...</span>
        </div>
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

<style lang="less">
.avatar-dropdown {
  .account-avatar {
    margin-right: 8px;
  }

  .account-name {
    float: right;
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
