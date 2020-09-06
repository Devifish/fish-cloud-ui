/** 电子邮箱 **/
export const EMAIL = "^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$";

/** 手机号码 **/
export const PHONE_NUM = /^((13[0-9])|(14[5,7,9])|(15([0-3]|[5-9]))|(166)|(17[0,1,3,5,6,7,8])|(18[0-9])|(19[8|9|1]))\\d{8}$/;

/** BASE64编码文件 **/
export const BASE64_FILE = "^data:([\\w/]+);base64,([\\w+/=]+)$";

/** 汉字 **/
export const CHINESE_CHARACTER = "^[\\u4e00-\\u9fa5]+$";

/** 身份证号码 **/
export const ID_CARD = "^\\d{15}|\\d{18}$";
