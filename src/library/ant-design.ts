import Antd, { message } from "ant-design-vue";
import "ant-design-vue/dist/antd.less";

// 防止弹出大量消息
message.config({
  duration: 2,
  maxCount: 1
});

export default Antd;
