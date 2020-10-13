<template> </template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "UserEdit",
  props: {
    onOk: {
      type: Function,
      default: (callback: any) => {}
    }
  },
  setup(props) {
    const { onOk } = props;

    onOk(async () => {
      console.log("sdad");
    });
    return {};
  }
});
</script>
