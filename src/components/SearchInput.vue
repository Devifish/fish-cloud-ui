<template>
  <a-auto-complete :size="size" :placeholder="placeholder">
    <a-input>
      <template v-slot:suffix>
        <search-outlined />
      </template>
    </a-input>
  </a-auto-complete>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { SearchOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  name: "SearchInput",
  props: {
    size: String,
    placeholder: {
      type: String,
      default: "请输入搜索内容"
    }
  },
  components: {
    SearchOutlined
  },
  setup() {

  }
});
</script>
