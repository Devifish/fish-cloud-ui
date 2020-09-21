<template>
  <list-table-container title="字典列表">

  </list-table-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ListTableContainer from "@/components/ListTableContainer.vue";

export default defineComponent({
  name: "DictionaryList",
  components: {
    ListTableContainer
  }
});
</script>
