import Cookies from "js-cookie";

const HTTPS_PROTOCOL = "https:";
const cookies = Cookies.withAttributes({
  path: "/",
  domain: location.hostname,
  secure: location.protocol === HTTPS_PROTOCOL,
  sameSite: "strict"
});

export default cookies;
