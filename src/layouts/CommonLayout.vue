<template>
  <div class="common-layout">
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "CommonLayout",
  data() {
    return {
      footerLinks: [],
      copyright: "",
    };
  },
};
</script>
