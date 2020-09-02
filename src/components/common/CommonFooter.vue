<template>
  <a-layout-footer class="common-footer">
    <div class="links">
      <a href="_self">帮助</a>
      <a href="_self">隐私</a>
      <a href="_self">条款</a>
    </div>
    <div class="copyright">
      Copyright &copy; 2020 devifish.cn
    </div>
  </a-layout-footer>
</template>

<style lang="less">
.common-footer {
  text-align: center;

  .links {
    margin-bottom: 8px;
    font-size: 14px;
    a {
      color: rgba(0, 0, 0, 0.45);
      transition: all 0.3s;
      &:not(:last-child) {
        margin-right: 40px;
      }
    }
  }
  .copyright {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
}
</style>
