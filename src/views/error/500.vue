<template>
  <a-result
    status="500"
    title="500"
    sub-title="很抱歉，当前服务端发生一些异常。"
  >
    <template #extra>
      <a-button type="primary" @click="$router.back()">
        返回
      </a-button>
    </template>
  </a-result>
</template>
