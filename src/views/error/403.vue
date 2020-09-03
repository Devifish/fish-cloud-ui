<template>
  <a-result
    status="403"
    title="403"
    sub-title="很抱歉，您没有权限访问这个页面。"
  >
    <template #extra>
      <a-button type="primary" @click="$router.back()">
        返回
      </a-button>
    </template>
  </a-result>
</template>
