<template>
  <a-layout-footer class="common-footer">
    <div class="links">
      <a href="javascript:void(0);">帮助</a>
      <a-divider class="divider" type="vertical" />
      <a href="javascript:void(0);">隐私</a>
      <a-divider class="divider" type="vertical" />
      <a href="javascript:void(0);">条款</a>
    </div>
    <div class="copyright">
      Copyright &copy; 2020 devifish.cn
    </div>
  </a-layout-footer>
</template>

<style lang="less">
@common-footer-color: #888;

.common-footer {
  text-align: center;

  .links {
    margin-bottom: 8px;
    font-size: 14px;

    a {
      color: @common-footer-color;
      transition: all 0.3s;
    }

    .divider {
      background: @common-footer-color;
    }
  }
  .copyright {
    color: @common-footer-color;
    font-size: 14px;
  }
}
</style>
