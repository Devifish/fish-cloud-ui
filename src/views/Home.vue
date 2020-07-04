<template>
  <common-layout>
    <hello-world msg="hello world"/>
  </common-layout>
</template>

<script>
import CommonLayout from "@/layouts/CommonLayout.vue";
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    CommonLayout,
    HelloWorld,
  },
};
</script>
