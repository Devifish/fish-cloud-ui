<template>
  <router-link v-if="to" :to="to" tag="a">
    <slot />
  </router-link>
  <a v-else href="javascript:void(0);">
    <slot />
  </a>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ActionLink",
  props: {
    to: String || Object
  }
});
</script>
