import Antd, { message, Modal } from "ant-design-vue";
import Router from "@/router";
import "ant-design-vue/dist/antd.less";

// 防止弹出大量消息
message.config({
  duration: 2,
  maxCount: 1
});

// 切换页面销毁所有对话框
Router.beforeEach(() => {
  Modal.destroyAll();
});

export default Antd;
