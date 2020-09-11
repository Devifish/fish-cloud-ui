<template>
  <a-result status="404" title="404" sub-title="很抱歉，这个页面不存在。">
    <template #extra>
      <a-button type="primary" @click="$router.back()">
        返回
      </a-button>
    </template>
  </a-result>
</template>
