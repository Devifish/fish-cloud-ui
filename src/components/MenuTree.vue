<template>
  <template v-for="item of data" :key="item.id">
    <template v-if="item.children?.length > 0">
      {{ item.name }}
      <a-sub-menu :key="item.id" v-bind="$props" >
        <template v-slot:title>
          <span>
            <span>{{ item.name }}</span>
          </span>
        </template>
      </a-sub-menu>
    </template>
    <a-menu-item v-else :key="item.id">
      {{ item.name }}
    </a-menu-item>
  </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Menu } from "ant-design-vue";

export default defineComponent({
  name: "MenuTree",
  props: {
    ...(Menu.SubMenu as any).props,
    data: Array
  },
  setup() {}
});
</script>
