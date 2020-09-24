<template>
  <a-layout class="base-layout">
    <a-layout-content>
      <router-view />
    </a-layout-content>

    <common-footer />
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CommonFooter from "@/components/CommonFooter.vue";

export default defineComponent({
  name: "BaseLayout",
  components: {
    CommonFooter
  }
});
</script>

<style lang="less">
.base-layout {
  height: 100%;
}
</style>
