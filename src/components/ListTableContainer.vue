<template>
  <div class="fish-list-layout">
    <a-card v-if="$slots.search">
      <slot name="search" />
    </a-card>

    <a-card :title="title">
      <template v-slot:extra>
        <slot name="extra" />
      </template>

      <slot />
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ListTableContainer",
  props: {
    title: String
  }
});
</script>
