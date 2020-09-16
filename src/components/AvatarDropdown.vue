<template>
  <a-dropdown>
    <span>
      <a-avatar class="account-avatar" :src="avatar" />
      <span>{{ username }}</span>
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
    username: String
  },
  emits: ["select"]
});
</script>

<style scoped>
.account-avatar {
  margin-right: 8px;
}
</style>
