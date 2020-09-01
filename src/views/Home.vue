<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld :msg="msg" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Home",
  data() {
    return {
      msg: "Welcome to Your Vue.js + TypeScript App"
    };
  },
  components: {
    HelloWorld
  },
  created() {
    console.log(this.$data.msg);
  }
});
</script>
